import { Router } from "express"
import Products from '../../models/product.model.js'

const router = Router()

router.post('/', async (req, res, next) => {
    try {
        let title = req.body.title
        let description = req.body.description
        let price = Number(req.body.price)
        let thumbnail = req.body.thumbnail
        let stock = Number(req.body.stock)

        // Ejecutar la función de añadir producto correctamente y manejar errores
        let response = await Products.create({ title, description, price, thumbnail, stock });
        if (response) {
            //return res.redirect('/products') 
            return res.status(201).json(response);
        }

        return res.status(400).json({ message: 'Product not created' }); // Manejar error genérico
    } catch (error) {
        console.log("hubo un error tio")
        next(error); // Manejar errores correctamente
    }
});

router.get('/', async (req, res, next) => {
    try {
        const productsPerPage = 6; // number of products per page for pagination

        const defaultPage = 1; // default page if 'page' query parameter is not present
        const page = req.query.page ? parseInt(req.query.page) : defaultPage; // get page number from 'page' query parameter or use default value
        const filter = req.query.filter ? req.query.filter : ''; // get filter value from 'filter' query parameter or use empty string

        const query = {}; // empty query object
        if (filter) {
            query.title = { $regex: new RegExp(filter, 'i') }; // add case-insensitive regex for 'title' field if 'filter' query parameter is present
        }

        // paginate Products collection using 'mongoose-paginate-v2' plugin
        const products = await Products.paginate(query, {
            page: page,
            limit: productsPerPage
        });

        console.log(products); // log paginated products

        return res.status(200).json(products); // send JSON response with paginated products and HTTP status code 200 (OK)
    } catch (error) {
        next(error)
    }
});


router.get('/:pid', async (req, res, next) => {
    try {
        let id = String(req.params.pid)
        let product = await Products.findById(id).exec()
        console.log(product)
        return res.status(200).json(product)
    } catch (error) {
        next(error)
    }
})
router.put('/:pid', async (req, res, next) => {
    try {
        let id = String(req.params.pid)
        let data = req.body
        let response = await Products.findByIdAndUpdate(id, data)
        if (response) {
            return res.status(200).json({ message: 'product updated' })
        }
        return res.status(400).json({ message: 'product not found' })
    } catch (error) {
        next(error)
    }
})
router.delete('/:pid', async (req, res, next) => {
    try {
        let id = String(req.params.pid)
        let response = await Products.findByIdAndDelete(id)
        if (response) {
            return res.status(200).json({ message: 'product deleted' })
        }
        return res.status(404).json({ message: 'not found' })
    } catch (error) {
        next(error)
    }
})

export default router