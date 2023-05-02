import express from 'express'
import manager from './products.js'

let server = express()

let PORT = 8080
let ready = ()=> console.log('server ready on port: '+PORT)

server.listen(PORT,ready)
server.use(express.urlencoded({extended:true}))

let index_route = '/'
let index_function = (req,res)=> {
    let quantity = manager.read_products().length
    console.log(quantity)
    return res.send(`there are ${quantity} products`)
}
server.get(index_route, index_function)

let one_route = '/products/:id'
let one_function = (request, response)=> {
    let parametros = request.params
    let id = Number(parametros.id)
    //console.log(parametros)
    let one = manager.read_product(id)
    if (one) {
        return response.send({
            success: true,
            user: one
        })
    } else {
        return response.send({
            success:false,
            user:'not found'
        })
    }

}
server.get(one_route,one_function)

let query_route = '/products'
let query_function = (req,res)=> {
    console.log(req.query)
    let quantity = req.query.quantity ?? 5
    let products = manager.read_products().slice(0,quantity)
    if (products.length>0) {
    return res.send({
        success: true,
        products
    })
} else {
    return res.send ({
        succes: false,
        products: 'not found'
    })
}
}
server.get(query_route,query_function)

let limit_route= '/api/products'
let limit_function= (req,res)=> {
   let limit = req.query.limit ?? 100
   let products = manager.read_product().slice(0,quantity)
   if (products.lenght>0) {
    return res.send({
        success: true,
        products
    })
   } else {
    return res.send ({
        succes: false,
        products: 'not found'
    })
   }
}
server.get(limit_route,limit_function)

let pid_route= '/api/products/:pid'
let pid_function= (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = products.find(products => products.id === productId);
    if (product) {
      return res.send({
         success: true,
         response: { product } });
    } else {
      return res.send({
         success: false,
         response: {} 
        });
    }
  };
  server.get(pid_route,pid_function)

  // Endpoint para obtener todos los carritos
 let api_carts='/api/carts'
 let api_function= (req, res) => {
    try {
      const carts = cartManager.getCarts();
      res.json({ success: true, response: carts });
    } catch (error) {
      res.status(500).json({ success: false, response: error.message });
    }
  };
  server.get(api_carts,api_function)
  
  // Endpoint para obtener un carrito por ID
  let carts_cdi='/api/carts/:cid'
  let cdi_function=(req, res) => {
    try {
      const cartId = req.params.cid;
      const cart = cartManager.getCartById(cartId);
      if (cart) {
        res.json({ success: true, response: cart });
      } else {
        res.status(404).json({ success: false, response: 'Not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, response: error.message });
    }
  };
server.get(carts_cdi,cdi_function)
