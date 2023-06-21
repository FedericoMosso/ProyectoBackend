import { Router } from "express"
import carts_router from './carts.mongo.js'
import products_router from './products.mongo.js'
import auth_login from './auth.login.js'
import auth_register from './auth.register.js'
import auth_signout from './auth.signout.js'

const router = Router()


router.use('/products', products_router)
router.use('/carts', carts_router)
router.use('/auth', auth_login, auth_register, auth_signout)

export default router