import client from '../database'
import bcrypt from 'bcrypt'

const {BCRYPT_PEPPER, SALT_ROUNDS} = process.env

export type User = {
    id?: Number;
    firstname: string;
    lastname: string;
    password: string;
}

export class UserStore{
    async index(): Promise<User[]>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM users;';
            const result =await conn.query(sql)
            conn.release()
            return result.rows
        }catch(err){
            throw new Error(`Could not find users. Error: ${err}`)
        }
    }

    async show(id: string): Promise<User>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM users WHERE id=($1);';
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`Could not find user with id ${id}. Error: ${err}`)
        }
    }

    async create(user: User): Promise<User>{
        try{
            
            const conn = await client.connect()
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *;'

            const hash = bcrypt.hashSync(
                user.password + BCRYPT_PEPPER, 
                parseInt(SALT_ROUNDS as string)
            )
                
            const result = await conn.query(sql, [user.firstname, user.lastname, hash])
            conn.release()
            return result.rows[0]

        }catch(err){
            throw new Error(`Could not create user. Error: ${err}`)
        }
    }

    async authenticate(firstname: string, password: string): Promise<User | null> {
        const conn = await client.connect()
        const sql = 'SELECT * FROM users WHERE firstname=($1);'
        const result = await conn.query(sql, [firstname])

        //console.log(password+BCRYPT_PEPPER)

        if(result.rows.length){

            const user = result.rows[0]
            
            console.log(user)

            if(bcrypt.compareSync(password+BCRYPT_PEPPER, user.password)){
                return user
            }
        }

        return null
    }
}