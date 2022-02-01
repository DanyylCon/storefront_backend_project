import {User, UserStore} from '../user'

const store = new UserStore()


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
        const user: User = {firstname: 'Keanu', lastname: 'Reeves', password: 'matrix'}
        const result = await store.create(user)
        expect(result.id).toEqual(2)
    })

    it('Index function should display list of users', async () => {
        const result = await store.index()
        expect(result[1].firstname).toEqual('Keanu')
    })

    it('Show function should display the correct user', async () => {
        const result = await store.show('2')
        expect(result.lastname).toEqual('Reeves')
    })

    it('Authenicate function should return user object once passed', async () => {
        const authUser = await store.authenticate('Keanu', 'matrix')
        expect(authUser?.lastname).toEqual('Reeves')
  })
})