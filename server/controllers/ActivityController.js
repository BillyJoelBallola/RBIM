import fs from 'fs'
import { activityModel } from '../models/ActivityModel.js';

export const uploadImage = async (req, res) => {
    try {
        const image = await req.file
        const { path, originalname } = image;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        fs.renameSync(path, newPath);

        return res.json({ success: true, data: newPath.replace("uploads", "")});
    } catch (error) {
        return res.json({ success: false, message: 'Internal Server Error'});
    }
}

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