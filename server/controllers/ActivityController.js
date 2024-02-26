import fs from 'fs'
import { activityModel } from '../models/ActivityModel.js';
import Twilio from 'twilio';
import B2 from 'backblaze-b2';

const b2 = new B2({
    applicationKeyId: process.env.APP_KEY,
    applicationKey: process.env.KEY_ID,
}) 
        
export const uploadImage = async (req, res) => {
    try {
        await b2.authorize();

        const file = req.file;
        const { path, originalname } = file;

        const fileContents = fs.readFileSync(path);

        const bucketName = 'rbimupload';
        const fileName = originalname;

        const response = await b2.uploadFile({
            bucketName,
            fileName,
            data: fileContents,
        });

        const publicUrl = `https://f002.backblazeb2.com/file/${bucketName}/${fileName}`;

        return res.json({ success: true, data: publicUrl });
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error'});
    }
}

// export const uploadImage = async (req, res) => {
//     try {
//         const image = await req.file
//         const { path, originalname } = image;
//         const parts = originalname.split(".");
//         const ext = parts[parts.length - 1];
//         const newPath = path + "." + ext;
//         fs.renameSync(path, newPath);

//         return res.json({ success: true, data: newPath.replace("uploads", "")});
//     } catch (error) {
//         return res.json({ success: false, message: 'Internal Server Error'});
//     }
// }

export const removeUploadedImage = async (req, res) => {
    try {
        const activityData = await req.body
        const { image } = activityData
        activityData?.id && await activityModel.updateActivity({...activityData, image: ''});
        fs.unlink(`uploads/${image.slice(1, -1) + image.slice(-1)}`, async (err) => {
            if (err) throw err
            return res.json({ success: true, message: 'Image removed successfully' });
        })
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
        twilio.messages
            .create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: contacts
            }).then(message => {
                return res.json({ success: true, message: 'Message send successfully'});
            }).catch(err => {
                return res.json({ success: false, message: err});
            })
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error'});
    }
}