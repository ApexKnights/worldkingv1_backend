import express from "express"
import { Tickets } from "../models/Tickets.js";
import { IsAuthenticated } from "../auth/authenticate.js";

const router = express.Router()




router.post('/post-ticket', IsAuthenticated, async (req, res) => {
    try {
        const { game, result, from, to, live } = req.body;
        const post_ticket = await Tickets.create({
            game,
            result,
            from,
            to,
            live
        })
        res.status(201).json({
            success: true,
            response: post_ticket,
            message: 'Your Game Details Has Been Posted'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error.message,

        })
    }
})


router.get('/get-tickets', async (req, res) => {
    try {
        const get_tickets = await Tickets.find();
        res.status(200).json({
            success: true,
            response: get_tickets,

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error.message,

        })
    }
})



router.put('/updateto-live/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const live_ticket = await Tickets.findByIdAndUpdate({ _id: id }, {
            $set: {
                live: true
            }
        }, { new: true })
        res.status(200).json({
            success: true,
            response: live_ticket,
            message: "Your Ticket has been updated"

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error.message,

        })
    }
})
router.put('/remove-live/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const live_ticket = await Tickets.findByIdAndUpdate({ _id: id }, {
            $set: {
                live: false
            }
        }, { new: true })
        res.status(200).json({
            success: true,
            response: live_ticket,
            message: "Your Ticket has been updated"

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error.message,

        })
    }
})


router.put('/highlight/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const hl_ticket = await Tickets.findByIdAndUpdate({ _id: id }, {
            $set: {
                highlight: true
            }
        }, { new: true })
        res.status(200).json({
            success: true,
            response: hl_ticket,
            message: "Your Ticket has been updated"

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error.message,

        })
    }
})
router.put('/remove-highlight/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const hl_ticket = await Tickets.findByIdAndUpdate({ _id: id }, {
            $set: {
                highlight: false
            }
        }, { new: true })
        res.status(200).json({
            success: true,
            response: hl_ticket,
            message: "Your Ticket has been updated"

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error.message,

        })
    }
})





router.get('/get-live-tickets', async (req, res) => {
    try {
        const live_tickets = await Tickets.find({ live: true })
        res.status(200).json({
            success: true,
            response: live_tickets,

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error.message,

        })
    }
})





router.delete('/delete/:id', IsAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const delete_ticket = await Tickets.findByIdAndDelete({ _id: id })
        res.status(200).json({
            success: true,
            message: "Your Ticket has been Deleted"
        })
    } catch (error) {

    }
})


router.put('/update/:id', IsAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const { game, result, from, to } = req.body;
        const hl_ticket = await Tickets.findByIdAndUpdate({ _id: id }, {
            $set: {
                game,
                result,
                from,
                to
            }
        }, { new: true })
        res.status(200).json({
            success: true,
            response: hl_ticket,
            message: "Your Ticket has been updated"

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error.message,

        })
    }
})




export default router