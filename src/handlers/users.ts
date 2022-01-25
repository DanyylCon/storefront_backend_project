import express, {Request, Response} from 'express'
import {User, UserStore} from '../models/user'

const store = new UserStore()

const index = async (req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    const id = req.params.id as string
    const user = await store.show(id) 
    res.json(user)
}

const create = async (req: Request, res: Response) => {
    const user: User = {firstname: req.body.firstname, lastname: req.body.lastname, password: req.body.password}
    const newUser = await store.create(user)
    res.json(newUser)
}

const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
}

export default userRoutes