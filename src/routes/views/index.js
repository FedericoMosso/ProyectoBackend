import { Router } from "express"
import auth_router from "./auth.js"

const router = Router()

router.get(
    '/',
    async (req,res,next) => {
        try {
            //let hola = chau
            return res.render(
                'index',    //nombre de la vista
                {           //datos dinamicos que puede llegar a necesitar la vista
                    name: 'igna',
                    //last_name: 'borraz',
                    alumnos: [
                        {name:'nico', photo:'https://www.grupoanton.es/ntn/wp-content/branding-personal.jpg'},
                        {name:'ale', photo:'https://www.grupoanton.es/ntn/wp-content/branding-personal.jpg'},
                        {name:'flor', photo: 'https://www.grupoanton.es/ntn/wp-content/branding-personal.jpg'}],
                    title: 'index',
                    script: './public/products.js'
                }        
            )
        } catch (error) {
            next(error)
        }
    }
)

router.use('/auth',auth_router)
//router.use('/products',product_router)
//router.use('/carts',cart_router)

export default router
//en el enrutador principal de vistas
//UNICAMENTE llamo a los enrutadores de vistas de recursos
//el endpoint de prueba de la linea y ESTA MAL UBICADO