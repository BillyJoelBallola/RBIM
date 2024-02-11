import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TextEditor from './TextEditor'
import Header from './Header'
import axios from 'axios'

import CustomDialog from './CustomDialog'
import { Toast } from 'primereact/toast'
import { LuImagePlus } from "react-icons/lu"
import { IoClose } from "react-icons/io5"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"
import { barangay } from '../../static/Geography'
import { FiSend } from "react-icons/fi";
import { UserContext } from '../../context/UserContext'

const ActivityForm = () => {
    const id = useParams().id
    const toast = useRef(null)
    const navigate = useNavigate()
    const [editContent, setEditContent] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleSMS, setVisibleSMS] = useState(false)
    const [individualDataThisYear, setIndividualDataThisYear] = useState([])
    const [participant, setParticipant] = useState({
        value: '',
        contact: []
    })
    const [message, setMessage] = useState('')
    const [addressData, setAddressData] = useState({})
    const [removeVisible, setRemoveVisible] = useState(false)
    const [activityForm, setActivityForm] = useState({
        title: '',
        address_barangay: '',
        type: '',
        date: '',
        content: '<p>Type the content of activity here...</p>',
        image: ''
    })
    const [address, setAddress] = useState('')
    const { loggedUser } = useContext(UserContext)

    useEffect(() => {
        const fetchAllAddress = async () => {
        const { data } = await axios.get("/api/address")
            if(data.success){
                const filtered = data?.data?.find(item => item?.id === loggedUser?.address_id)
                setAddress(filtered)
            }
        }

        if(loggedUser?.role !== 'administrator'){
            fetchAllAddress()
        }
    }, [loggedUser])

    useEffect(() => {
        if(address){
            setActivityForm(current => ({...current, address_barangay: address?.barangay}))
        }
    }, [address])

    useEffect(() => {
        const fetchActivityData = async () => {
            const { data } = await axios.get(`/api/activity/${id}`)
            if(data.success){
                const activity = data?.data
                setActivityForm({
                    title: activity?.title || null,
                    type: activity?.type || null,
                    date: activity?.date || null,
                    address_barangay: activity?.address_barangay || null,
                    content: activity?.content || null,
                    image: activity?.image || null
                })
            }
        }

        if(id){
            fetchActivityData()
        }
    }, [id])

    useEffect(() => {
        const uploadImage = async () => {
            const formData = new FormData()
            formData.append('image', activityForm.image)
            const { data } = await axios.post("/api/upload", formData)
            if(data.success){
                const image = data.data
                setActivityForm(current => ({...current, image: image}));
            }
        }

        if((activityForm.image !== '' || activityForm.image !== null)){
            uploadImage()
        }
    }, [activityForm.image])

    useEffect(() => {
        const fetchAddress = async () => {
            const { data } = await axios.get('/api/address')
            if(data.success){
                const address = data?.data
                const addressData = address.find(item => item?.barangay?.toLowerCase()?.includes(activityForm.address_barangay.toLowerCase()))
                setAddressData(addressData)
            }
        }

        if(activityForm.address_barangay !== '' || activityForm.address_barangay !== null){
            fetchAddress()
        }
    }, [activityForm.address_barangay])

    useEffect(() => {   
        const fetchIndividualData = async () => {
            const { data } = await axios.get('/api/individuals')
            if(data.success){
                const individualData = data?.data
                const date = new Date()
                const individualDataConductedThisYear = individualData.filter(item => Number(item?.date_encoded?.toString()?.split("-")[0]) === date.getFullYear() && Number(item?.address) === Number(addressData?.id))
                setIndividualDataThisYear(individualDataConductedThisYear);
            }
        }

        fetchIndividualData()
    }, [addressData])

    const showToast = (severity, summary, detail) => {
        return toast.current.show({ severity: severity, summary: summary, detail: detail })
    }

    const resetForm = () => {
        setActivityForm({
            title: '',
            address_barangay: '',
            type: '',
            content: '<p>Type the content of activity here...</p>',
            image: ''
        })
    }

    const handleInput = (e) => {
        const name = e.target.name
        setActivityForm(current => ({
            ...current,
            [name]: name === 'image' ? e.target.files[0] : e.target.value
        }))
    }  
    
    const removeImage = async () => {
        const activityData = id ? { ...activityForm, id: id } : activityForm
        const { data } = await axios.post('/api/remove_image', activityData)
        if(data.success){
            setRemoveVisible(false)
            setActivityForm(current => ({...current, image: '' }));
        }
    }

    const save = async () => {
        if(
            activityForm.title === '' ||
            activityForm.address === '' ||
            activityForm.type === '' ||
            activityForm.date === '' ||
            activityForm.content === ''
        ){
            setVisible(false)
            return showToast('error', 'Failed', 'Fill up all fields')
        }else if(activityForm.title.length <= 10){
            setVisible(false)
            return showToast('error', 'Failed', 'Title must be 10 or more characters')
        }else if(activityForm.content.length <= 20){
            setVisible(false)
            return showToast('error', 'Failed', 'Content must be 20 or more characters')
        }else{

            const { data } = await axios.post("/api/activity", activityForm);
            if(data.success){
                navigate(`./${data.data}`)
                setVisible(false)
                return showToast('success', 'Success', 'Activity successfully added')
            }else{
                resetForm()
                setVisible(false)
                return showToast('error', 'Failed', 'Failed to add activity. Please try again later')
            }
        }
    }

    const saveChanges = async () => {
        if(
            activityForm.title === '' ||
            activityForm.address === '' ||
            activityForm.type === '' ||
            activityForm.content === ''
        ){
            setVisible(false)
            return showToast('error', 'Failed', 'Fill up all fields')
        }else if(activityForm.title.length <= 10){
            setVisible(false)
            return showToast('error', 'Failed', 'Title must be 10 or more characters')
        }else if(activityForm.content.length <= 20 || activityForm.content.length > 2600){
            setVisible(false)
            return showToast('error', 'Failed', 'Content must be 20 - 2,600 characters')
        }else{

            const { data } = await axios.put("/api/activity", {...activityForm, id: id});
            if(data.success){
                setVisible(false)
                setEditContent(false)
                return showToast('success', 'Success', 'Activity successfully updated')
            }else{
                resetForm()
                setVisible(false)
                setEditContent(false)
                return showToast('error', 'Failed', 'Failed to add activity. Please try again later')
            }
        }
    }

    const handleParticipantChanges = (e) => {
        const value = e.target.value
        let contacts = []
        const code = '+63'

        if(value === ''){
            contacts = []
        }else if(Number(value) === 1){
            individualDataThisYear?.map(item => {
                if(Number(item.Q4) >= 60){
                    if(!contacts.includes(code + item.phone_no)){
                        contacts.push(code + item.phone_no)
                    } 
                }
            })
        }else if(Number(value) === 2){
            individualDataThisYear?.map(item => {
                if(Number(item.Q12) === 1 || Number(item.Q12) === 2 && item.Q12 !== null){
                    if(!contacts.includes(code + item.phone_no)){
                        contacts.push(code + item.phone_no)
                    } 
                }
            })
        }else if(Number(value) === 3){
            individualDataThisYear?.map(item => {
                if(Number(item.Q29) !== 99 && item.Q29 !== null){
                    if(!contacts.includes(code + item.phone_no)){
                        contacts.push(code + item.phone_no)
                    } 
                }
            })
        }else if(Number(value) === 4){
            individualDataThisYear?.map(item => {
                if(Number(item.Q29) !== 2 && Number(item.Q29) !== 99 && item.Q29 !== null){
                    if(!contacts.includes(code + item.phone_no)){
                        contacts.push(code + item.phone_no)
                    } 
                }
            })
        }

        setParticipant({value: value, contact: contacts})
    }

    const resetSMS = () => {
        setParticipant({value: '', contact: []})
        setMessage('')
    }

    const sendSMS = async () => {
        const contacts = participant?.contact
        const SMS = {message, contacts};
        
        if(message === '') return
        if(message?.length > 320){
            return showToast('error', 'Failed', "Please follow the character limit")
        }

        const { data } = await axios.post('/api/send_SMS', SMS)
        if(data.success){
            resetSMS()
            setVisibleSMS(false)
            return showToast('success', 'Success', 'Message sent successfully to the participants')
        }else{
            return showToast('error', 'Failed', 'Failed to send message to the participants')
        }
    }

    const footerContent = (
        <div className='flex justify-end'>
            <button className='px-6 py-2 rounded-md bg-transparent' onClick={() => setVisible(false)}>No</button>
            <button 
                className='px-6 py-2 rounded-md bg-[#008605] text-white' 
                onClick={id ? () => saveChanges() : () => save()}
            >
                Yes
            </button>
        </div>
    );

    const footerRemove = (
        <div className='flex justify-end'>
            <button className='px-6 py-2 rounded-md bg-transparent' onClick={() => setRemoveVisible(false)}>No</button>
            <button 
                className='px-6 py-2 rounded-md bg-[#008605] text-white' 
                onClick={() => removeImage()}
            >
                Yes
            </button>
        </div>
    );

    const footerSMS = (
        <div className='flex justify-end'>
            <button 
                className='px-6 py-2 rounded-md bg-transparent' 
                onClick={() => {
                    resetSMS()
                    setVisibleSMS(false)
                }}
            >Cancel</button>
            <button 
                disabled={participant?.contact?.length <= 0 ? true : false}
                className='px-6 py-2 rounded-md bg-[#008605] text-white' 
                onClick={() => sendSMS()}
            >
                Send
            </button>
        </div>
    );

    return (
        <>
            <CustomDialog
                header={id ? 'Save Changes' : 'Save'}
                visible={visible}
                setVisible={setVisible} 
                footer={footerContent}
                classStyle={'w-[90%] md:w-[60%] lg:w-[40%]'}
                content={(
                    <p>Are you sure you want to {id ? 'save the changes' : 'save'}?</p>
                )}
            />
            <CustomDialog
                header={'Remove'}
                visible={removeVisible}
                setVisible={setRemoveVisible} 
                footer={footerRemove}
                classStyle={'w-[90%] md:w-[60%] lg:w-[40%]'}
                content={(
                    <p>Are you sure you want to remove this image? Once it's removed, it cannot be restored again.</p>
                )}
            />
            <CustomDialog
                header={'Send SMS'}
                visible={visibleSMS}
                resetForm={resetSMS}
                setVisible={setVisibleSMS} 
                footer={footerSMS}
                classStyle={'w-[90%] md:w-[60%] lg:w-[40%]'}
                content={(
                    <div className='grid gap-4'>
                        <span className='text-sm'>All contact numbers will come from the survey forms conducted this year.</span>
                        <div className="form-group">
                            <label htmlFor="participant" className='flex items-center gap-1'>
                                <span>Participant</span>
                                {
                                    participant?.value !== '' &&
                                    <span className='text-gray-600 font-normal text-xs'>[{participant?.contact?.length} Contact Numbers]</span>
                                }
                            </label>
                            <select name="participant" id="participant" value={participant.value} onChange={handleParticipantChanges}>
                                <option value="">-- choose participants --</option>
                                <option value="1">Senior Citizen</option>
                                <option value="2">Student</option>
                                <option value="3">Disabled</option>
                                <option value="4">Solo Parent</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                name="message" 
                                id="message" 
                                rows="5" 
                                className='resize-none'
                                placeholder='Type message here...'
                            ></textarea>
                            {
                                message?.length > 0 &&
                                <span className='text-xs'>{message?.length}/320 Characters</span>
                            }
                        </div>
                    </div>
                )}
            />
            <Toast ref={toast} />
            <Header pageName={"Activity Form"} />
            <div className="content">
                <div className='pt-4 pb-5 flex gap-2 justify-between'>
                    <Link 
                        to={'/rbim/activities'}
                        className='text-3xl' 
                        onClick={() => resetForm()}
                    ><HiOutlineArrowNarrowLeft /></Link>
                    <div className='flex gap-2'>
                        {
                            id &&
                            <button 
                                className='bg-gray-600 hover:bg-gray-500 duration-150 text-white py-2 px-4 rounded-md flex gap-2 items-center' 
                                onClick={() => setVisibleSMS(true)}
                            >
                                <FiSend />
                                <span>SMS</span>
                            </button>
                        }
                        <button 
                            className='bg-[#008605] hover:bg-[#008605]/60 duration-150 text-white py-2 px-4 rounded-md' 
                            onClick={() => setVisible(true)}
                        >
                            {id ? 'Save Changes' : 'Save'}
                        </button>
                    </div>
                </div>
                <div className='grid gap-5 pb-10'>
                    <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
                        <div className="form-group w-full">
                            <label htmlFor="title">Title</label>
                            <input type="text" id='title' placeholder='Activity title' name='title' value={activityForm.title} onChange={handleInput}/>
                        </div>
                        <div className="form-group w-full">
                            <label htmlFor="address_barangay">Barangay</label>
                            <select
                                disabled={loggedUser?.role !== 'administrator' ? true : false}
                                name="address_barangay" id="address_barangay" 
                                value={activityForm.address_barangay} 
                                onChange={handleInput}
                            >
                                <option value="">-- choose barangay --</option>
                                <option value="Municipal">Municipal</option>
                                {
                                    barangay?.map((barangay, idx) => (
                                        <option value={barangay} key={idx}>{barangay}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
                        <div className="form-group w-full">    
                            <label htmlFor="date">Date</label>
                            <input type="date" id='date' name='date' value={activityForm?.date?.toString()?.split("T")[0]} onChange={handleInput}/>
                        </div>
                        <div className="form-group w-full">    
                            <label htmlFor="type">Type</label>
                            <select name="type" id="type" value={activityForm.type} onChange={handleInput} disabled={id ? true : false}>
                                <option value="">-- choose type --</option>
                                <option value="1">Event</option>
                                <option value="2">Program</option>
                                <option value="3">Announcement</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content" className='flex items-center justify-between'>
                            <span>Content</span>
                            {
                                id &&
                                <button className='underline ml-2 font-normal' onClick={() => !editContent ? setEditContent(true) : setEditContent(false)}>
                                    {editContent ? 'Cancel Editting' : 'Edit Content'}
                                </button>
                            }
                        </label>
                        {
                            id && !editContent ?
                            <div 
                                id='content'
                                className='tiptap border border-gray-500 p-4 rounded-lg overflow-hidden' 
                                dangerouslySetInnerHTML={{ __html: activityForm.content }}
                            />
                            :
                            <div id='content' className='border border-gray-500 rounded-lg overflow-hidden'>
                                <TextEditor content={activityForm.content} setContent={setActivityForm} />
                            </div>
                        }
                        <span className='text-xs'>{activityForm?.content?.length}/2600 Characters</span>
                    </div>
                    <div className='flex flex-col md:flex-row gap-8'>
                        {
                            Number(activityForm?.type) !== 3 ?
                            activityForm.image === '' || typeof activityForm.image !== 'string' ? 
                            <div className="form-group">
                                <label htmlFor="image" className='bg-gray-200 hover:bg-gray-300 cursor-pointer duration-150 rounded-md text-2xl grid place-items-center w-[250px] aspect-square'>
                                    <div className='flex flex-col items-center'>
                                        <LuImagePlus />
                                        <span className='text-sm font-normal'>Add Photo</span>
                                    </div>
                                </label>
                                <input type="file" id='image' name='image' accept='image/png, image/jpeg, image/jpg' className='hidden' onChange={handleInput}/>
                            </div>
                            :
                            <div className='relative w-full md:w-[450px] h-auto bg-gray-200 border border-gray-600 rounded-lg overflow-hidden'>
                                <button className='absolute bg-gray-200 p-1 text-lg rounded-full shadow-sm right-1 top-1' onClick={() => setRemoveVisible(true)}>
                                    <IoClose className='text-gray-700'/>
                                </button>
                                <img 
                                    className='object-contain'
                                    src={`http://localhost:4000/${activityForm?.image?.slice(1, -1) + activityForm?.image?.slice(-1)}`} 
                                    alt="uploaded-image" 
                                />
                            </div>
                            : 
                            <></>
                        }
                        {
                            Number(activityForm?.type) !== 3 &&
                            <span className='w-[90%] md:w-[40%] text-sm text-gray-500'>Kindly provide an image to accompany this activity. Feel free to upload an image in either PNG, JPEG, or JPG format.</span>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActivityForm 