import express, {Request, Response} from 'express'
import {User, UserStore} from '../models/user'
import jwt from 'jsonwebtoken'

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
    try{    

        const newUser = await store.create(user);
        const tokenString = process.env.TOKEN_SECRET as string
        const token = jwt.sign({user: newUser}, tokenString )
        res.json(token)

    }catch(err){

        res.status(400)
        res.json(err)

    }
    
}

const authenticate = async (req: Request, res: Response) => {
    const firstname = req.body.firstname;
    const password = req.body.password;
    const user = await store.authenticate(firstname, password)
    res.json(user)
}

const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
    app.post('/users/auth', authenticate)
}

export default userRoutes