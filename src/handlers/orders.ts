import express, {Request, Response} from 'express'
import {Order, OrderStore} from '../models/order'
import { verifyAuthToken } from './users'

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
        const result = await store.deleteOrders()
        res.json(result)
    }catch (err){
        res.json(err)
    }
}

const ordersCompleted = async (req: Request, res: Response) => {
    try{
        const userId = parseInt(req.params.id)
        const result = await store.ordersCompleted(userId)
        res.json(result)
    }catch(err){
        res.json(err)
    }
}

const orderRoutes = (app: express.Application) => {
    app.post('/orders/users/:id', createOrder)
    app.get('/orders/users/:id', verifyAuthToken, currentByUser)
    app.delete('/orders', deleteOrders)
    app.get('/orders/users/:id/completed', verifyAuthToken, ordersCompleted)
}

export default orderRoutes;