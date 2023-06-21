import { Router } from "express"

const router = Router()

router.post("/signout", async(req, res, next) => {
    if (!req.session.mail) return res.status(400).json({success: false, message: "user is not logged in"})
    req.session.destroy()
    return res.status(200).json({success: true, message: "successfully signout"})
})


export default router