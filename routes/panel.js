import express from "express"
import { IsAuthenticated } from "../auth/authenticate.js"
import { Panel } from "../models/Panel.js"

const router = express.Router()



router.post('/add-panel', IsAuthenticated, async (req, res) => {
    try {
        const { gameId, game } = req.body
        const createPanel = await Panel.create({
            gameId,
            game,
        })
        res.status(201).json({
            success: true,
            response: "Panel has been created, update with dates",
            data: createPanel,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error
        })
    }
})

router.post('/initiate-panel/:id', IsAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const { date } = req.body;
        const panelId = "pnl" + (Math.floor(Math.random() * (90000 - 10000 + 1)) + 10000).toString();
        const panelData = {
            id: panelId,
            date: date,
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: "",
            saturday: "",
            sunday: "",
        }
        const updatePanel = await Panel.findOneAndUpdate({ gameId: id }, {
            $push: { panel: panelData }
        },
            { new: true }
        );
        res.status(201).json({
            success: true,
            response: `Panel has been initiated, updated with ${date}`,
            data: updatePanel,
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            res: error
        })
    }
})


router.post('/update-panel/:id', IsAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const { panelEntryId, field, value } = req.body;

        const updatedPanel = await Panel.findOneAndUpdate(
            { gameId: id, "panel.id": panelEntryId }, // Find the document with matching panel entry
            { $set: { [`panel.$[elem].${field}`]: value } }, // Update specific field dynamically
            {
                arrayFilters: [{ "elem.id": panelEntryId }], // Filter the exact panel entry
                new: true, // Return the updated document
            }
        );
        res.status(200).json({
            success: true,
            response: `Panel has been updated, updated ${field} with ${value}`,
            data: updatedPanel,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            res: error
        })
        console.log(error)
    }
})

router.delete('/delete-panel/:gameId/:panelId', IsAuthenticated, async (req, res) => {
    try {
        const { gameId, panelId } = req.params;

        const updateResult = await Panel.findOneAndUpdate(
            { gameId },
            { $pull: { panel: { id: panelId } } },
            { new: true }
        );

        if (!updateResult) {
            return res.status(404).json({
                success: false,
                message: "Panel or Game not found",
            });
        }

        res.status(200).json({
            success: true,
            message: `Panel with id ${panelId} deleted successfully`,
            data: updateResult
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the panel",
            error
        });
    }
});

router.get('/get-panel/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const findgame = await Panel.findOne({ gameId: id })
        res.status(200).json({
            success: true,
            response: findgame
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            res: error
        })
    }
})














export default router