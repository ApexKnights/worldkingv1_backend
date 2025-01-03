import express from "express"
import bcrypt from "bcrypt"
import { User } from "../models/User.js";
import { sendCookie } from "../utils/cookie.js";
import { IsAuthenticated } from "../auth/authenticate.js";


const router = express.Router()






// *Register A User
router.post("/register", async (req, res) => {
    try {
        const { username, password, email, mobile } = req.body;
        const userId = "KW" + (Math.floor(Math.random() * (90000 - 10000 + 1)) + 10000).toString();
        let createuser = await User.findOne({ email })
        if (createuser) {
            res.status(400).json({
                success: false,
                message: "User Already Exsists"
            })
        } else {
            const salt = await bcrypt.genSalt(10);
            const encryptedpassword = await bcrypt.hashSync(password, salt);
            createuser = await User.create({
                username,
                email,
                mobile,
                userId,
                password: encryptedpassword,
            })

            res.status(201).json({
                success: true,
                response: `New Admin with userId -  ${userId}, has been registered`,
            })
        }
    } catch (error) {
        console.log(error)
    }
})




// * Login
router.post("/login", async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await User.findOne({ userId });
        if (!user) {
            res.status(404).json({
                success: false,
                response: "User Doesn't Exists"
            })
        } else {
            const decrypt = await bcrypt.compareSync(password, user.password);
            if (!decrypt) {
                res.status(401).json({
                    success: false,
                    response: "Sorry invalid credentials, try again"
                })
            } else {
                sendCookie(user, res, "User Logged In Successfully", 200)
            }
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            response: "Something Went Wrong",
            err: error,
        })
        console.log(error)
    }
})


//* Refetch- Getting looged user details
router.get("/refetch", IsAuthenticated, async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })


})



// ! Logout Route
router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).json({ message: "Logged Out Successfully" })
    } catch (error) {
        res.status(500).json(error)
    }

})





export default router