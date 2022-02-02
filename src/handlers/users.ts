import express, {Request, Response, NextFunction} from 'express'
import {User, UserStore} from '../models/user'
import jwt from 'jsonwebtoken'

const store = new UserStore()

const index = async (req: Request, res: Response) => {
    try{
        const users = await store.index()
        res.json(users)
    }catch(err){
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {
    try{
        const id = req.params.id as string
        const user = await store.show(id) 
        res.json(user)
    }catch(err){
        res.json(err)
    }
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
    
    try{
        const user = await store.authenticate(firstname, password)
        if(user){
            const tokenString = process.env.TOKEN_SECRET as string
            const token = jwt.sign({user: user}, tokenString )
            res.json(token)
        }else{
            res.send(`Sorry could not authenticate ${firstname}` )
        }
    }catch(err){
        res.status(400)
        res.json(err)
    }   
}

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try{
        const tokenString = process.env.TOKEN_SECRET as string
        const authHeader = req.headers.authorization as string
        const token = authHeader.split(' ')[1]
        jwt.verify(token, tokenString)
        next()
    }catch(err){
        res.status(401)
        res.json(`Invalid token ${err}`)    
    }
} 

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', create)
    app.post('/users/auth', authenticate)
}

export default userRoutes