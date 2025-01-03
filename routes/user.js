import express from "express"
import bcrypt from "bcrypt"
import { User } from "../models/User.js";
import { IsAuthenticated } from "../auth/authenticate.js";


const router = express.Router()




router.put('/update-user/:id', IsAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, mobile, password } = req.body
        const salt = await bcrypt.genSalt(10);
        const encryptedpassword = await bcrypt.hashSync(password, salt);
        const edit_profile = await User.findByIdAndUpdate({ _id: id }, {
            $set: {
                username,
                email,
                mobile,
                password: encryptedpassword
            }
        }, { new: true })
        res.status(200).json({
            success: true,
            message: "Profile has been updated",
            response: edit_profile
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            response: error.message,

        })
    }
})




export default router