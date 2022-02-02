import express, {Request, Response, NextFunction} from 'express'
import { Product, ProductStore } from '../models/product'
import { verifyAuthToken } from './users'

const store = new ProductStore()

const index = async (req: Request, res: Response) => {
    try{
        const products = await store.index()
        res.json(products)    
    }catch(err){
        res.json(err);
    }
    }

const show = async (req: Request, res: Response) => {
    try{
        const id = req.params.id as string
        const product = await store.show(id)
        res.json(product)
    }catch(err){
        res.json(err);
    }    
}

const create = async (req: Request, res: Response) => {

    try{
        const product: Product = {name: req.body.name, price: parseInt(req.body.price as string), category: req.body.category}
        const newProduct = await store.create(product)
        res.json(newProduct)

    }catch(err){
        res.status(400)
        res.json(err)
    }
    
}

const productByCategory = async (req: Request, res: Response) => {
    try{
        const result = await store.productByCategory(req.params.cat)
        res.json(result)
    }catch(err){
        res.json(err)
    }
}


const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
    app.get('/products/category/:cat', productByCategory)
}

export default productRoutes;

