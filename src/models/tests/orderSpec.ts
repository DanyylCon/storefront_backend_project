import {Order, OrderStore} from '../order'
import client from '../../database'
import { UserStore } from '../user'

const store = new OrderStore()
let userId: Number;
const status = 'active';

describe('Order Model Defined', () => {
    it('Should have a create order function', () => {
        expect(store.createOrder).toBeDefined()
    })
    it('Should have a ordersByUser function', () => {
        expect(store.ordersByUser).toBeDefined()
    })
    it('Should have a deleteOrders order function', () => {
        expect(store.deleteOrders).toBeDefined()
    })
})

describe('Order model functions', () => {
    beforeAll( async ()  => {
        try{
            const conn = await client.connect()
            const sql = "INSERT INTO users (firstname, lastname) VALUES ('John', 'Smith') RETURNING *;"
            const result = await conn.query(sql)
            userId = result.rows[0].id
            conn.release()
        }catch(err){
            throw new Error(`Could not create user for testing order model: ${err}`)
        }
    })

    it('createOrder function should create order', async () => {
        const createdOrder = await store.createOrder(userId, status)
        expect(createdOrder).toEqual({id: 1, user_id: userId, status: status})
    })
    
    it('ordersByUser function should display orders by user id', async () => {
        const userOrder = await store.ordersByUser(userId)
        expect(userOrder).toEqual([{id: 1, user_id: userId, status: status}])
    })

    it('deleteOrders function should delete orders', async () => {
        const deletedOrder = await store.deleteOrders()
        expect(deletedOrder).toEqual([{id: 1, user_id: userId, status: status}])
    })

})