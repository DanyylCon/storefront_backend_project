import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';

const app: express.Application = express()
const port = process.env.PORT
const address: string = `Starting on port ${process.env.PORT}`


app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(port, function () {
    console.log(`starting app on: ${address}`)
})
