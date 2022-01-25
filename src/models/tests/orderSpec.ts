// import {Order, OrderStore} from '../order'
// import client from '../../database'
// import { PoolClient } from 'pg'

// const store = new OrderStore()

// describe("Order Model Functions", () => {
    
//     let conn: PoolClient

//     beforeAll(async () => {
//         try{
//             conn = await client.connect()
//             let sql = "INSERT INTO products (name, price, category) VALUES ('Tea', 10, 'drinks');"
//             await conn.query(sql)
//             sql = "INSERT INTO users (firstname, lastname, password) VALUES ('Keanu','Reeves','matrix');"
//             await conn.query(sql)
//             sql = "INSERT INTO orders (product_id, quantity, user_id, status) VALUES (1, 1, 1, 'completed');"
//             await conn.query(sql)

//         }catch(err){
//             throw new Error(`Could not insert before test ${err}`)
//         }
//     })

//     it('Should display order by user', async () => {
//         const result = await store.ordersByUser(1)
//         expect(result).toEqual([{id: 1, product_id: 1, quantity: 1, user_id: 1, status: 'completed'}])
//     })

//     afterAll( async () => {
//         let sql = 'DELETE FROM orders;'
//         await conn.query(sql)
//         sql = 'DELETE FROM users;'
//         await conn.query(sql)
//         sql = 'DELETE FROM products;'
//         await conn.query(sql)

//         conn.release()
//     })
// })