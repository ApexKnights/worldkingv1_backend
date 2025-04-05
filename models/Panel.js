import mongoose from "mongoose";

const panelSchema = new mongoose.Schema({
    gameId: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true,
    },
    panel: {
        type: Array,
        default: []
    }
}, { timestamps: true })


export const Panel = mongoose.model("Panel", panelSchema)


