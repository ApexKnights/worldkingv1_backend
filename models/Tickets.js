import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    game: {
        type: String,
        required: true,
    },
    result: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    highlight: {
        type: Boolean,
        default: false
    },
    live: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


export const Tickets = mongoose.model("Tickets", ticketSchema)