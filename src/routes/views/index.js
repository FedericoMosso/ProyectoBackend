import { Router } from "express"
import { ProductsArrayConvert } from "../../devUtils.js"
import Products from '../../models/product.model.js'

const router = Router()

router.get(
    '/',
    async (req,res,next) => {
        try {
            //let hola = chau
            return res.render(
                'index',    //nombre de la vista
                {         
                    name: 'Nico',
                    last_name: 'Lopez',
                    photo: 'https://www.w3schools.com/howto/img_avatar.png',

                    
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
            topTitle: "prueba",
            conection: '/public/conection.js'
        })
    } catch(error) {

    }
})

router.get('/products', async (req, res, next) => {
    try {
        const pageNumber = parseInt(req.query.page) || 1;
        const productsPerPage = +req.query.limit || 5;
        const filter = req.query.filter || "";
        const query = {};
        if (filter) {
            query.title = { $regex: filter, $options: "i" };
        }
        
        const products = await Products.paginate(query, { page: pageNumber, limit: productsPerPage });
        console.log(products)

        const formattedProducts = products.docs.map(product => ({
            title: product.title,
            thumbnail: product.thumbnail,
            price: product.price,
            link: `/products/${product._id}`
        }));

        return res.render('products', {
            //products: formattedProducts,
            title: 'Products Page',
            //topTitle: `Total Products: ${products.totalDocs}`,
            //limit: `Productos por pagina ${products.limit}`,
            conection: '/public/conection.js',
            script2: "/public/products.js",
            //cart: 'numProducts',
            //paginationprev: `${products.prevPage}`,
           // paginationnext: `${products.nextPage}`,
            //currentPage: `Pagina ${pageNumber}`,
            //totalPages: products.totalPages,
            //filter: filter
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get(
    '/new_product',
    async(req,res,next) => {
        try {
            return res.render(
                'new_product',
                {   title: 'new_product',
                    title: 'Product',
                    conection: '/public/conection.js'}
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
                name: 'Nico',
                last_name: 'Lopez',
                photo: 'https://www.w3schools.com/howto/img_avatar.png',
                script: "public/cart.js",
                conection: '/public/conection.js'
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
            return res.render('chat', {
                title: 'Chat bot',
                conection: '/public/conection.js',
                script2: "public/chatbot.js"
            })
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
                { title: 'Form',
                conection: '/public/conection.js' }
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
                { title: 'Register', 
                conection: '/public/conection.js'}
            )
        } catch (error) {
            next()
        }
    }
)

router.get('/login', async (req, res, next) => {
    try {
        return res.render('login', {})
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/signout', async (req, res, next) => {
    try {
        return res.render('signout', {})
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export default router