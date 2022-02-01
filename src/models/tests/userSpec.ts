import {User, UserStore} from '../user'
import supertest from 'supertest'
import app from '../../server'

const store = new UserStore()

const request = supertest(app)

//user variables to use for authentication and token creation
const testFirst = process.env.TEST_USER_FIRST as string
const testLast = process.env.TEST_USER_LAST as string
const testPass = process.env.TEST_USER_PASS as string

let token: string

describe('Test User endpoints', () => {
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

    it('POST  /users (create)', async () => {
        return request
        .post('/users')
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    })    
    it('POST  /users/auth (authenticate)', async () => {
        return request
        .post('/users/auth')
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    })
    it('GET /users (index/no token)', async () => {
        return request
        .get('/users')
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
    })
    it('GET /users/:id (show/no token)', async () => {
        return request
        .get('/users/1')
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
    })
    it('GET /users (index/with token)', async () => {
        return request
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    })
    it('GET /users/:id (show/with token)', async () => {
        return request
        .get('/users/1')
        .set('Authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    })
})

describe('User Model Defined', () => {
    it('Should have an index function', () => {
        expect(store.index).toBeDefined()
    })

    it('Should have a show function', () => {
        expect(store.show).toBeDefined()
    })

    it('Should have a create function', () => {
        expect(store.create).toBeDefined()
    })
})

describe('User Model CRUD', () => {

    it('Create function should create a user', async () => {
        const user: User = {firstname: testFirst, lastname: testLast, password: testPass}
        const result = await store.create(user)
        expect(result.id).toEqual(3)
    })

    it('Index function should display list of users', async () => {
        const result = await store.index()
        expect(result[2].firstname).toEqual(testFirst)
    })

    it('Show function should display the correct user', async () => {
        const result = await store.show('3')
        expect(result.lastname).toEqual(testLast)
    })

    it('Authenicate function should return user object once passed', async () => {
        const authUser = await store.authenticate(testFirst, testPass)
        expect(authUser?.lastname).toEqual(testLast)
  })
})