import { Router } from "express"
import auth_router from "./auth.js"
import ProductManager from "../../managers/product.js"
import { ProductsArrayConvert } from "../../devUtils.js"

const router = Router()

router.get(
    '/',
    async (req,res,next) => {
        try {
            //let hola = chau
            return res.render(
                'index',    //nombre de la vista
                {           //datos dinamicos que puede llegar a necesitar la vista
                    name: 'Federico',
                    last_name: 'Mosso',
                    photo: 'https://www.w3schools.com/howto/img_avatar.png',
                    //last_name: 'borraz',
                    produtcs: [
                        {title:'Bondiola Ahumada', photo:'public/img/1.jpg', price: '$15.000'},
                        {title:'Bondiola Ahumada', photo:'public/img/2.jpg', price: '$20.000'},
                        {title:'Bondiola Ahumada', photo:'public/img/3.jpg', price: '$23.000'}],
                    title: 'index',
                    script: '/public/conection.js'
                }        
            )
        } catch (error) {
            next(error)
        }
    }
)

router.get("/products/:pid", async (req, res, next) => {

    try {
        return res.render("view_product", {
            script2: '/public/uniqueProduct.js',
            topTitle: "prueba"
        })
    } catch(error) {

    }
})

router.get(
    '/products',
    async(req,res,next) => {
        try {

            const prods = ProductManager.read_products()
            const prodsClone = JSON.parse(JSON.stringify(prods)) // esto lo hago porque nose si el product manager regresa el objeto original 
            const products = ProductsArrayConvert(prodsClone)
            // al final si cambia el array original y tuve que clonar


            /*
            [ // estos eran los productos que estaban en el render.
                {title:'Bondiola Ahumada', photo:'public/img/1.jpg', price: '$15.000'},
                {title:'Bondiola Ahumada', photo:'public/img/2.jpg', price: '$20.000'},
                {title:'Bondiola Ahumada', photo:'public/img/2.jpg', price: '$20.000'},
                {title:'Bondiola Ahumada', photo:'public/img/2.jpg', price: '$20.000'},
                {title:'Bondiola Ahumada', photo:'public/img/2.jpg', price: '$20.000'},
                {title:'Bondiola Ahumada', photo:'public/img/2.jpg', price: '$20.000'},
                {title:'Bondiola Ahumada', photo:'public/img/2.jpg', price: '$20.000'},
                {title:'Bondiola Ahumada', photo:'public/img/2.jpg', price: '$20.000'},
                {title:'Bondiola Ahumada', photo:'public/img/2.jpg', price: '$20.000'},
                {title:'Bondiola Ahumada', photo:'public/img/2.jpg', price: '$20.000'},
                {title:'Bondiola Ahumada', photo:'public/img/2.jpg', price: '$20.000'},
                {title:'Bondiola Ahumada', photo: 'public/img/3.jpg', price: '$23.000'}
            ],
            */

            return res.render('products', {
                products: products,
                title: 'Products Page',
                topTitle: `Products: ${products.length}`,
                script: '/public/products.js',
            })

        } catch (error) {
            console.log(error)
            next()
        }
    }
)

router.get(
    '/new_product',
    async(req,res,next) => {
        try {
            return res.render(
                'new_product',
                {   title: 'new_product',
                    script: '/public/conection.js',
                    title: 'Product' }
            )
        } catch (error) {
            next()
        }
    }
)


router.get(
    '/carts',
    async(req,res,next) => {
        try {
            return res.render('carts', {
                script: "public/cart.js"
            })
        } catch (error) {
            next()
        }
    }
)


router.get(
    '/chat',
    async(req,res,next) => {
        try {
            return res.render(
                'chat',
                { title: 'Chat bot' }
            )
        } catch (error) {
            next()
        }
    }
)

router.get(
    '/form',
    async(req,res,next) => {
        try {
            return res.render(
                'form',
                { title: 'Form' }
            )
        } catch (error) {
            next()
        }
    }
)

router.get(
    '/register',
    async(req,res,next) => {
        try {
            return res.render(
                'register',
                { title: 'Register' }
            )
        } catch (error) {
            next()
        }
    }
)

router.use('/auth',auth_router)
// router.use('/products',products_router)
// router.use('/carts',carts_router)

export default router
//en el enrutador principal de vistas
//UNICAMENTE llamo a los enrutadores de vistas de recursos
//el endpoint de prueba de la linea y ESTA MAL UBICADO