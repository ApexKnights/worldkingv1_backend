import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    notice1: {
        type: String,
    },
    notice2: {
        type: String,
    },
    notice3: {
        type: String,
    },
}, { timestamps: true })


export const Notice = mongoose.model("Notice", noticeSchema)