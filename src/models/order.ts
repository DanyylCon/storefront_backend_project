import client from '../database'

export type Order = {
    id?: Number;
    product_id: Number;
    quantity: Number;
    user_id: Number;
    status: string;
}

export class OrderStore{
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
}