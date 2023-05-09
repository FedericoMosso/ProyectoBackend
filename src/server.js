import express from 'express'
import router from './routes/index.js'
import error_handler from './middlewares/error_handler.js'
import not_found_handler from './middlewares/not_found.js'
import { engine } from 'express-handlebars'
import { __dirname } from '../utils.js'

const server = express()

const PORT = 8080
const ready = ()=> console.log('server ready on port '+PORT)

server.engine('handlebars',engine())    //prendo el motor de plantillas
server.set('view engine','handlebars')  //configurar el motor para que funcione
server.set('views',__dirname+'/views') //configuro donde van a estar las plantillas
server.use('/public',express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use('/',router)
server.use(error_handler)
server.use(not_found_handler)

server.listen(PORT,ready)