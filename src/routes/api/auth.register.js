import { Router } from "express"
import { Types } from "mongoose"
import Users from "../../models/user.model.js"

const router = Router()

const verify = a => {
    if (a != undefined || a != null) return true
    return false
}
router.use((req, res, next) => { // middleware para validar propiedades obligatorias
    const { name, photo, mail, role, password } = req.body

    if (verify(name) && verify(mail) && verify(role) && verify(password)) {
        next()
    } else {
        return res.status(400).json({
            success: false,
            message: "missing required data"
        })
    }
})

router.use((req, res, next) => { // middleware para validar la contraseña
    const { password } = req.body

    if (String(password).length >= 8) {
        next()
    } else {
        return res.status(400).json({
            success: false,
            message: "password length is lower than 8 characters"
        })
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const { name, photo, mail, role, password } = req.body
        const response = await Users.create({
            name,
            photo,
            mail: mail.toLowerCase(),
            role,
            password
        })

        return res.status(201).json({ success: true, message: "created" })
    } catch (err) {
        next(err)
    }

})

export default router