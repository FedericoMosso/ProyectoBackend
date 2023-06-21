import { Router } from "express"
import Users from "../../models/user.model.js"

const router = Router()

const verify = a => {
    if (a != undefined || a != null) return true
    return false
}
router.use((req, res, next) => { // middleware para validar propiedades obligatorias
    try {
        const { mail, password } = req.body
        if (verify(mail) && verify(password)) {
            next()
        } else {
            return res.status(400).json({
                success: false,
                message: "missing required data"
            })
        }
    } catch (err) {
        next(err)
    }
})

router.use((req, res, next) => { // middleware para validar la contraseña
    try {
        const { password } = req.body
        if (String(password).length >= 8) {
            next()
        } else {
            return res.status(400).json({
                success: false,
                message: "password length is lower than 8 characters"
            })
        }
    } catch (err) {
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    try {

        if (req.session.mail) return res.status(400).json({success: false, message: "user is already logged in"})

        const { mail, password } = req.body
        if (!mail && !password) return res.status(401).json({ success: false, message: "invalid mail or password" })

        const finded = await Users.findOne({ mail: String(mail).toLowerCase(), password: String(password) }).exec()
        if (!finded) return res.status(401).json({ success: false, message: "invalid login" })

        //console.log(req.signedCookies)
        // hola nico el max age 604800 * 1000 es debido a que la cookie debe durar 7 dias segun el HOL
        //return res.cookie("sessionCookie", JSON.stringify({ u: finded.mail, pw: finded.password }), { maxAge: 604800 * 1000, signed: true }).status(201).json({ success: true, message: "user is now logged in" })
        req.session.mail = finded.mail
        req.session.role = finded.role

        console.log(req.session)
        return res.status(200).json({success: true, message: "user is now logged in"})
    } catch (err) {
        next()
    }

})



export default router