import express, {Request, Response} from 'express'
import {Order, OrderStore} from '../models/order'

const store = new OrderStore()

const createOrder = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const status = req.body.status;
    try{
        const order = await store.createOrder(userId, status);
        res.json(order)
    }catch(err){
        res.json(err);
    }
}

const currentByUser = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try{
        const orders = await store.ordersByUser(userId)
        res.json(orders)
    }catch(err){
        res.json(err);
    }
}

const deleteOrders = async (req: Request, res: Response) => {
    try{
        await store.deleteOrders()
        res.json('Orders have been deleted!')
    }catch (err){
        res.json(err)
    }
}

const orderRoutes = (app: express.Application) => {
    app.post('/orders/users/:id', createOrder)
    app.get('/orders/users/:id', currentByUser)
    app.delete('/orders', deleteOrders)
}

export default orderRoutes;