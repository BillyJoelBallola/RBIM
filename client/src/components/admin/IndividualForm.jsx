import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavigationContext } from '../../context/NavigationContext';
import { useNavigate, useParams } from 'react-router-dom'
import CustomDialog from '../admin/CustomDialog'
import Divider from '../Divider';
import Header from './Header'
import axios from 'axios';

import PrintableIndividualForm from './PrintableIndividualForm';

import { Toast } from 'primereact/toast'
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { LuImagePlus } from "react-icons/lu"
import { IoClose } from "react-icons/io5"

const IndividualForm = () => {
    const id = useParams().id
    const toast = useRef(null)
    const navigate = useNavigate()
    const [preview, setPreview] = useState(false)
    const [removeVisible, setRemoveVisible] = useState(false)
    const [individual, setIndividual] = useState({})
    const { setIsNavigateOpen } = useContext(NavigationContext)

    const showToast = (severity, summary, detail) => {
        return toast.current.show({ severity: severity, summary: summary, detail: detail })
    }
        
    useEffect(() => {
        const fetchIndividual = async () => {
          const indResponse = await axios.get('/api/individuals')
          const addressResponse = await axios.get('/api/address')
          if(indResponse?.data?.success && addressResponse?.data?.success){
            const filteredData = indResponse?.data?.data?.find(item => Number(item.id) === Number(id))
            const matchAddress = addressResponse?.data?.data?.find(item => Number(item.id) === Number(filteredData.address))
            setIndividual({...filteredData, ...{matchAddress, address_id: matchAddress.id}})
          }
        }

        if(id !== undefined){
            fetchIndividual()
        }
    }, [id])

    useEffect(() => {
        const uploadImage = async () => {
            const formData = new FormData()
            formData.append('image', individual?.image)
            const uploadResponse = await axios.post("/api/upload", formData)
            if(uploadResponse.data.success){
                const { public_id, format } = uploadResponse?.data?.data
                const image = public_id + "." + format
                await axios.put("/api/individual_image", { image: image, id: id })
                setIndividual(current => ({...current, image: image}));
                return showToast('success', 'Success', 'Image uploaded successfully')
            }
        }

        if((individual?.image !== '' || individual?.image !== null)){
            uploadImage()
        }
    }, [individual?.image])

    const handleInput = (e) => {
        const name = e.target.name
        setIndividual(current => ({
            ...current,
            [name]: e.target.files[0]
        }))
    } 

    const removeImage = async () => {
        const { data } = await axios.put('/api/individual_remove_image', individual)
        if(data.success){
            setRemoveVisible(false)
            setIndividual(current => ({...current, image: '' }));
            return showToast('success', 'Success', 'Image removed successfully')
        }else{
            return showToast('error', 'Failed', 'Image removed successfully')
        }
    }

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

    return (
        <>
            <Toast ref={toast} />
            <Header pageName={"Individual Profile Form"} />
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
            <PrintableIndividualForm 
                preview={preview} 
                setPreview={setPreview} 
                individual={individual}
            />
            <div className="content">
                <div className='pt-4 pb-3 flex justify-between items-center gap-2'>
                    <button 
                        className='text-3xl' 
                        onClick={() => navigate('/rbim/citizen-information')}
                    ><HiOutlineArrowNarrowLeft /></button>
                    <button 
                        className='hidden md:block bg-gray-600 hover:bg-gray-500 duration-150 text-white py-2 px-4 rounded-md' 
                        onClick={() => {
                            setPreview(true)
                            setIsNavigateOpen(true)
                        }}
                    >Download</button>
                </div>
                <div className='grid gap-6 pt-4 pb-8'>
                    <div className="form-group">
                        <label htmlFor="household">Household No.</label>
                        <input 
                            type="text" 
                            id='household'
                            value={individual?.household_number || ''} 
                            onChange={(e) => setIndividual(current => ({...current, household_number: e.target.value }))}
                            disabled
                        />
                    </div>
                    <Divider />
                    <div>
                        <span className='font-semibold text-gray-700'>LOCATION</span>
                        <div className='grid gap-4 mt-4'>
                            <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
                                <div className="form-group w-full">
                                    <label htmlFor="province">Province</label>
                                    <input 
                                        type="text" 
                                        id='province'
                                        value={individual?.matchAddress?.province || ''} 
                                        onChange={(e) => setIndividual(current => ({...current, province: e.target.value }))}
                                        disabled
                                    />
                                </div>
                                <div className="form-group w-full">
                                    <label htmlFor="municipal">City/Municipality</label>
                                    <input 
                                        type="text" 
                                        id='municipal'
                                        value={individual?.matchAddress?.municipal || ''} 
                                        onChange={(e) => setIndividual(current => ({...current, municipal: e.target.value }))}
                                        disabled
                                    />
                                </div>
                                <div className="form-group w-full">
                                    <label htmlFor="barangay">Barangay</label>
                                    <input 
                                        type="text" 
                                        id='barangay'
                                        value={individual?.matchAddress?.barangay || ''} 
                                        onChange={(e) => setIndividual(current => ({...current, barangay: e.target.value }))}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div>
                        <span className='font-semibold text-gray-700'>PERSONAL INFORMATION</span>
                        <div className='grid gap-4 mt-4'>
                            <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
                                <div className="form-group w-full">
                                    <label htmlFor="lastname">Last name</label>
                                    <input 
                                        type="text" 
                                        id="lastname"
                                        value={individual?.Q1?.split(',')[0]?.trim() || ''} 
                                        onChange={(e) => setIndividual(current => ({...current, Q1: e.target.value }))}
                                        disabled
                                    />
                                </div>
                                <div className="form-group w-full">
                                    <label htmlFor="firstname">First name</label>
                                    <input 
                                        type="text" 
                                        id="firstname"
                                        value={individual?.Q1?.split(',')[1]?.trim() || ''} 
                                        onChange={(e) => setIndividual(current => ({...current, Q1: e.target.value }))}
                                        disabled
                                    />
                                </div>
                                <div className="form-group w-full">
                                    <label htmlFor="middlename">Middle name/initial</label>
                                    <input 
                                        type="text" 
                                        id='middlename'
                                        value={individual?.Q1?.split(',')[2]?.trim() || ''} 
                                        onChange={(e) => setIndividual(current => ({...current, Q1: e.target.value }))}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="form-group w-full">
                                <label htmlFor="address">Address</label>
                                <input 
                                    type="text" 
                                    id='address'
                                    value={`${individual?.matchAddress?.barangay}, ${individual?.matchAddress?.municipal}, ${individual?.matchAddress?.province}` || ''} 
                                    onChange={(e) => setIndividual(current => ({...current, address: e.target.value }))}
                                    disabled
                                />
                            </div>
                            <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
                                <div className="form-group w-full">
                                    <label htmlFor="dob">Date of birth</label>
                                    <input 
                                        type="date" 
                                        id='dob'
                                        value={individual?.Q5?.toString().split("T")[0] || ''} 
                                        onChange={(e) => setIndividual(current => ({...current, Q5: e.target.value }))}
                                        disabled
                                    />
                                </div>
                                <div className="form-group w-full">
                                    <label htmlFor="pob">Place of birth</label>
                                    <input 
                                        type="text" 
                                        id='pob'
                                        value={individual?.Q6 || ''} 
                                        onChange={(e) => setIndividual(current => ({...current, Q6: e.target.value }))}
                                        disabled
                                    />
                                </div>
                                <div className="form-group w-full">
                                    <label htmlFor="sex">Sex</label>
                                    <select 
                                        id="sex"
                                        value={individual?.Q3 || ''} 
                                        onChange={(e) => setIndividual(current => ({...current, Q3: e.target.value }))}
                                        disabled
                                    >
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
                                <div className="form-group w-full">
                                    <label htmlFor="civil">Civil status</label>
                                     <select 
                                        id="civil"
                                        value={individual?.Q8 || ''} 
                                        onChange={(e) => setIndividual(current => ({...current, Q8: e.target.value }))}
                                        disabled
                                    >
                                        <option value="1">Single</option>
                                        <option value="2">Married</option>
                                        <option value="3">Living-in</option>
                                        <option value="4">Widowed</option>
                                        <option value="5">Separated</option>
                                        <option value="6">Divorced</option>
                                        <option value="7">Unknown</option>
                                    </select>
                                </div>
                                <div className="form-group w-full">
                                    <label htmlFor="occupation">Occupation</label>
                                    <select 
                                        id="occupation"
                                        value={individual?.Q44 || ''} 
                                        onChange={(e) => setIndividual(current => ({...current, Q44: e.target.value }))}
                                        disabled
                                    >
                                        <option value="1">Refrigeration and Airconditioning</option>
                                        <option value="2">Automotive/Heavy Equipment Servicing</option>
                                        <option value="3">Metal Worker</option>
                                        <option value="4">Building Wiring Installation</option>
                                        <option value="5">Heavy Equipment Operation</option>
                                        <option value="6">Plumbing</option>
                                        <option value="7">Welding</option>
                                        <option value="8">Carpentry</option>
                                        <option value="9">Baking</option>
                                        <option value="10">Dressmaking</option>
                                        <option value="11">Linguist</option>
                                        <option value="12">Computer Graphics</option>
                                        <option value="13">Painting</option>
                                        <option value="14">Beauty Care</option>
                                        <option value="15">Commercial Cooking</option>
                                        <option value="16">Housekeeping</option>
                                        <option value="17">Massage Therapy</option>
                                    </select>
                                </div>
                                <div className="form-group w-full">
                                    <label htmlFor="citizen">Citizenship</label>
                                    <select 
                                        id="citizen"
                                        value={individual?.Q7 || ''} 
                                        onChange={(e) => setIndividual(current => ({...current, Q7: e.target.value }))}
                                        disabled
                                    >
                                        <option value="1">Filipino</option>
                                        <option value="2">Non-Filipino</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group w-full">
                                <label htmlFor="relation">Relatioship to household head</label>
                                <select 
                                    id="relation"
                                    value={individual?.Q2 || ''} 
                                    onChange={(e) => setIndividual(current => ({...current, Q2: e.target.value }))}
                                    disabled
                                >
                                    <option value="1">Head</option>
                                    <option value="2">Spouse</option>
                                    <option value="3">Son</option>
                                    <option value="4">Daughter</option>
                                    <option value="5">Stepson</option>
                                    <option value="6">Stepdaughter</option>
                                    <option value="7">Son-in-law</option>
                                    <option value="8">Daughter-in-law</option>
                                    <option value="9">Grandson</option>
                                    <option value="10">Granddaughter</option>
                                    <option value="11">Father</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-8'>
                        {
                            individual &&
                            individual?.image === '' || typeof individual?.image !== 'string' ? 
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
                            <div className='relative w-full md:w-[250px] h-auto bg-gray-200 border border-gray-600 rounded-lg overflow-hidden'>
                                <button className='absolute bg-gray-200 p-1 text-lg rounded-full shadow-sm right-1 top-1' onClick={() => setRemoveVisible(true)}>
                                    <IoClose className='text-gray-700'/>
                                </button>
                                <img 
                                    className='object-contain'
                                    src={`http://res.cloudinary.com/dplelvfxi/image/upload/v1709045429/${individual?.image}`}   
                                    alt="uploaded-image" 
                                />
                            </div>
                        }
                        <span className='w-[90%] md:w-[40%] text-sm text-gray-500'>Kindly provide an image to accompany this individual profile. Feel free to upload an image in either PNG, JPEG, or JPG format.</span>
                     </div>
                </div>
            </div>
        </>
    )
}

export default IndividualForm