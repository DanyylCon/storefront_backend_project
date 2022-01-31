import client from '../database'

export type Order = {
    id?: Number;    
    user_id: Number;
    status: string;
}

export class OrderStore{

    async createOrder(user_id: Number, status: string): Promise<Order>{
        try{
            const conn = await client.connect()
            const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *;'
            const result = await conn.query(sql, [user_id, status])
            conn.release()
            return result.rows[0]
        }catch (err){
            throw new Error(`Could not create order. ${err}`)
        }
    }

    async ordersByUser(userId: Number): Promise<Order[]> {
        try{
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=($1);'
            const result = await conn.query(sql, [userId])
            conn.release()
            return result.rows
        }catch(err){
            throw new Error(`Could not find orders by user with id ${userId}`)
        }
    }

    async deleteOrders(): Promise<Order[]>{
        try{
            const conn = await client.connect()
            const sql = 'DELETE FROM orders RETURNING *;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows;
        }catch (err){
            throw new Error(`Could not delete orders`)
        }
    }
}