import {Order, OrderStore} from '../order'
import supertest from 'supertest';
import app from '../../server';
import {User, UserStore} from '../user'

const orderStore = new OrderStore()
const userStore = new UserStore()


//variables for user to which to attach the order for the test
const status = 'completed';

//user object from which to create the user for the tests
const testFirst = process.env.TEST_USER_FIRST as string
const testLast = process.env.TEST_USER_LAST as string
const testPass = process.env.TEST_USER_PASS as string
const user: User = {firstname: testFirst, lastname: testLast, password: testPass}


const request = supertest(app)
let token: string


describe('Testing Order endpoints',  () => {
    beforeAll( async ()  => {
        try{
           await userStore.create(user)
        }catch(err){
            throw new Error(`Could not create a user for testing order model: ${err}`)
        }
        request
            .post('/users/auth')
            .send({
              firstname: user.firstname,
              password: user.password,
            })
            .end((err, response) => {
              token = response.body; 
             // console.log(token);
            });
    })

    it('GET /orders/users/:id (currentByUser/no token)', async () => {
        return request
        .get('/orders/users/1')
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
    })
    it('GET /orders/users/:id/completed (ordersCompleted/no token)', async () => {
        return request
        .get('/orders/users/1/completed')
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
    })
    it('GET /orders/users/:id (currentByUser/with token)', async () => {
        return request
        .get('/orders/users/1')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    })
    it('GET /orders/users/:id/completed (ordersCompleted/with token)', async () => {
        return request
        .get('/orders/users/1/completed')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    })
 
    
})

describe('Order Model Defined', () => {
    it('Should have a create order function', () => {
        expect(orderStore.createOrder).toBeDefined()
    })
    it('Should have a ordersByUser function', () => {
        expect(orderStore.ordersByUser).toBeDefined()
    })
    it('Should have a deleteOrders order function', () => {
        expect(orderStore.deleteOrders).toBeDefined()
    })
})

describe('Order model functions', () => {


    it('createOrder function should create order', async () => {
        const createdOrder = await orderStore.createOrder(1, status)
        expect(createdOrder).toEqual({id: 1, user_id: 1, status: status})
    })
    
    it('ordersByUser function should display orders by user id', async () => {
        const userOrder = await orderStore.ordersByUser(1)
        expect(userOrder).toEqual([{id: 1, user_id: 1, status: status}])
    })

    it('ordersCompleted function should display orders by user id that are completed', async () => {
        const completedOrders = await orderStore.ordersByUser(1)
        expect(completedOrders).toEqual([{id: 1, user_id: 1, status: status}])
    })

    it('deleteOrders function should delete orders', async () => {
        const deletedOrder = await orderStore.deleteOrders()
        expect(deletedOrder).toEqual([{id: 1, user_id: 1, status: status}])
    })

})
