import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';


const app: express.Application = express()
dotenv.config();
const address: string = `Starting on port ${process.env.PORT}`


app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(process.env.PORT, function () {
    console.log(`starting app on: ${address}`)
})
