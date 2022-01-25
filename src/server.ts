import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import productRoutes from './handlers/products';

const app: express.Application = express()
dotenv.config();
const port = process.env.PORT || 3001
const address: string = `Port ${process.env.PORT}`


app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

productRoutes(app)

app.listen(process.env.PORT, function () {
    console.log(`starting app on: ${address}`)
})
