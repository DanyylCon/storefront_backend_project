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
        const result = await store.create({firstname: 'Keanu', lastname: 'Reeves', password: 'matrix'})
        expect(result).toEqual({id: 1, firstname: 'Keanu', lastname: 'Reeves', password: 'matrix'})
    })

    it('Index function should display list of users', async () => {
        const result = await store.index()
        expect(result).toEqual([{id: 1, firstname: 'Keanu', lastname: 'Reeves', password: 'matrix'}])
    })

    it('Show function should display the correct user', async () => {
        const result = await store.show('1')
        expect(result).toEqual({id: 1, firstname: 'Keanu', lastname: 'Reeves', password: 'matrix'})
    })
})