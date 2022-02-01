import {Product, ProductStore} from '../product'
import app from '../../server'
import supertest from 'supertest'

const store = new ProductStore()

const request = supertest(app)

//user variables to use for authentication and token creation
const testFirst = process.env.TEST_USER_FIRST as string
const testPass = process.env.TEST_USER_PASS as string

let token: string

describe('Testing Product endpoints',  () => {
    beforeAll( async ()  => {
        request
            .post('/users/auth')
            .send({
              firstname: testFirst,
              password: testPass,
            })
            .end((err, response) => {
              token = response.body; 
            });
    })

    it('POST  /products (create/no token)', async () => {
        return request
        .post('/products')
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
    })
    it('POST /products (create/w token)', async () => {
        return request
        .post('/products')
        .set('Authorization', `Bearer ${token}`).
        send({name: 'Coffee', price: 30, category: 'drinks'})
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    })
    it('GET /products (index)', async () => {
        const response = await request.get('/products')
        expect(response.status).toBe(200)
    })
    it('GET /products/:id (show)', async () => {
        return request
        .get('/products/1')
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    })
    it('GET /products/category/:cat (productByCategory)', async () => {
        return request
        .get('/products/category/drinks')
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    })

})

describe('Product Model Defined', () => {
    it('Should have an index function', () => {
        expect(store.index).toBeDefined()
    })
    it('Should have a show function', () => {
        expect(store.show).toBeDefined()
    })
    it('Should have a create function', () => {
        expect(store.create).toBeDefined()
    })
    it('Should have a productByCategory function', () => {
        expect(store.productByCategory).toBeDefined()
    })
})

describe('Product Model CRUD', () => {

    it('Create function should add a product', async () => {
        const result = await store.create({name: 'Herbal Tea', price: 10, category: 'drinks'})
        expect(result).toEqual({id: 2, name: 'Herbal Tea', price: 10, category: 'drinks' })
    })

    it('Index function should return a list of products', async () => {
        const result = await store.index()
        expect(result).toEqual([{id: 1, name: 'Coffee', price: 30, category: 'drinks'}, 
            {id: 2, name: 'Herbal Tea', price: 10, category: 'drinks' }])
    })

    it('Show function should return the correct product', async () => {
        const result = await store.show('2')
        expect(result).toEqual({id: 2, name: 'Herbal Tea', price: 10, category: 'drinks' })
    })
    
    it('productByCategory function should return the correct product', async () => {
        const result = await store.productByCategory('drinks')
        expect(result).toEqual([{id: 1, name: 'Coffee', price: 30, category: 'drinks'}, 
            {id: 2, name: 'Herbal Tea', price: 10, category: 'drinks' }])
    })

})

