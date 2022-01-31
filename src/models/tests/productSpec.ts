import {Product, ProductStore} from '../product'

const store = new ProductStore()


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
        expect(result).toEqual({id: 1, name: 'Herbal Tea', price: 10, category: 'drinks' })
    })

    it('Index function should return a list of products', async () => {
        const result = await store.index()
        expect(result).toEqual([{id: 1, name: 'Herbal Tea', price: 10, category: 'drinks' }])
    })

    it('Show function should return the correct product', async () => {
        const result = await store.show('1')
        expect(result).toEqual({id: 1, name: 'Herbal Tea', price: 10, category: 'drinks' })
    })
    
    it('productByCategory function should return the correct product', async () => {
        const result = await store.productByCategory('drinks')
        expect(result).toEqual([{id: 1, name: 'Herbal Tea', price: 10, category: 'drinks' }])
    })

})