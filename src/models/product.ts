import client from '../database'

export type Product = {
    id: Number;
    name: string;
    price: Number;
    category: string;
}

export class ProductStore{
    async index(): Promise<Product[]>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM products;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        }catch(err){
            throw new Error(`Could not get products. Error: ${err}` )
        }
    }

    async show(id: string): Promise<Product>{
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM products WHERE id=($1);'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`Could not find product with id ${id}. Error: ${err}`)
        }
    }

    async create(prod: Product): Promise<Product>{
        try{
            const conn = await client.connect()
            const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *;'
            const result = await conn.query(sql, [prod.name, prod.price, prod.category])
            conn.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`Could not create product. Error: ${err}`)
        }
    }
}