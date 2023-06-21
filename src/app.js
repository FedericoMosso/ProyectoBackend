import 'dotenv/config.js'
import express from 'express'
import router from './routes/index.js'
import error_handler from './middlewares/error_handler.js'
import not_found_handler from './middlewares/not_found.js'
import { __dirname } from './utils.js'
import {engine} from 'express-handlebars'
import session from 'express-session'
import mongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'

const server = express()

server.engine('handlebars',engine())
server.set('views',__dirname+'/views')
server.set('view engine','handlebars')

server.use(cookieParser(process.env.SECRET_COOKIE))
server.use(session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.LINK_MONGO,
        ttl: 604800*1000
    })
}))
server.use('/public',express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use('/',router)
server.use(error_handler)
server.use(not_found_handler)

export default server