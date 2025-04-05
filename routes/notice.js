import express from 'express';
import { Notice } from '../models/Notice.js';


const router = express.Router();


router.post('/add-notice', async (req, res) => {
    try {
        const existingNotice = await Notice.findOne();
        if (existingNotice) {
            return res.status(400).json({
                success: false,
                message: "A notice already exists. Please update it instead."
            });
        }

        const { notice1, notice2, notice3 } = req.body;
        const newNotice = new Notice({ notice1, notice2, notice3 });
        await newNotice.save();

        res.status(201).json({
            success: true,
            message: "Notice created successfully",
            data: newNotice
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating notice",
            error
        });
    }
});

router.put('/update-notice', async (req, res) => {
    try {
        const { notice1, notice2, notice3 } = req.body;

        const updatedNotice = await Notice.findOneAndUpdate(
            {},
            { notice1, notice2, notice3 },
            { new: true }
        );

        if (!updatedNotice) {
            return res.status(404).json({
                success: false,
                message: "No notice exists to update. Please create one first."
            });
        }

        res.status(200).json({
            success: true,
            message: "Notice updated successfully",
            data: updatedNotice
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating notice",
            error
        });
    }
});

router.delete('/delete-notice', async (req, res) => {
    try {
        const deleted = await Notice.findOneAndDelete();

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "No notice found to delete."
            });
        }

        res.status(200).json({
            success: true,
            message: "Notice deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting notice",
            error
        });
    }
});

router.get('/get-notice', async (req, res) => {
    try {
        const notice = await Notice.findOne();

        if (!notice) {
            return res.status(404).json({
                success: false,
                message: "No notice found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Notice fetched successfully",
            data: notice
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching notice",
            error
        });
    }
});


export default router