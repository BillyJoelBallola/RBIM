import { activityModel } from '../models/ActivityModel.js';
import cloudinary from '../cloudinary.js';
import Twilio from 'twilio';

export const uploadImage = async (req, res) => {
    try {
        const image = await req.file
        cloudinary.uploader.upload(image.path, function (err, result){
            if(err) {
              console.log(err);
              return res.json({success: false, message: "Failed to upload image"})
            }
         
            res.json({success: true, message: "Image uploaded!", data: result})
        })
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error'});
    }
}

export const removeUploadedImage = async (req, res) => {
    try {
        const activityData = await req.body
        activityData?.id && await activityModel.updateActivity({...activityData, image: ''});
        cloudinary.uploader.destroy(`${activityData?.image?.split('.')[0]}`, async (err,result) => {
            if (err) throw err
            return res.json({ success: true, message: 'Image removed successfully' })
        });
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error'});
    }
}

export const addActivity = async (req, res) => {
    try {
        const activityData = await req.body;
        const data = await activityModel.addActivity(activityData);
        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error'});
    }
}

export const updateActivity = async (req, res) => {
    try {
        const activityData = await req.body;
        await activityModel.updateActivity(activityData);
        return res.json({ success: true, message: 'Activity successfully updated' });
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error'});
    }
}

export const getActivityById = async (req, res) => {
    try {
        const { id } = await req.params;
        const data = await activityModel.getActivityById(id);
        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error'});
    }
} 

export const getAllActivity = async (req, res) => {
    try {
        const data = await activityModel.getAllActivity();
        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error'});
    }
} 

export const getAllEventsAnsPrograms = async (req, res) => {
    try {
        const data = await activityModel.getAllEventsAndPrograms();
        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error'});
    }
} 

export const getAllAnnouncements = async (req, res) => {
    try {
        const data = await activityModel.getAllAnnouncements();
        return res.json({ success: true, data: data });
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error'});
    }
}

export const deleteActivityById = async (req, res) => {
    try {
        const { id } = await req.params;
        await activityModel.deleteActivityById(id);
        return res.json({ success: true, message: 'Activity deleted successfully' });
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error'});
    }
} 

export const sendSMS = async (req, res) => {
    try {
        const { message, contacts } = await req.body
        const twilio = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

        const promises = contacts.map(contact => {
            return twilio.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: contact
            });
        });
        
        await Promise.all(promises);

        return res.json({ success: true, message: 'Messages sent successfully' });
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error'});
    }
}