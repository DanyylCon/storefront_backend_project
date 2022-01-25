import express, {Request, Response} from 'express'
import { Product, ProductStore } from '../models/product'

const store = new ProductStore()

const index = async (req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const id = req.params.id as string
    const product = await store.show(id)
    res.json(product)
}

const create = async (req: Request, res: Response) => {
    
    try{
        // const name = req.body.name
        // const price = parseInt(req.body.price as string)
        // const category = req.body.category

        const product: Product = {name: req.body.name, price: parseInt(req.body.price as string), category: req.body.category}
        const newProduct = await store.create(product)
        res.json(newProduct)

    }catch(err){
        res.status(400)
        res.json(err)
    }
    
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
}

export default productRoutes;

