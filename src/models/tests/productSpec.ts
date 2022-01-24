import {Product, ProductStore} from '../product'

const store = new ProductStore()


describe('Product Model', () => {
    it('Should have an index function', () => {
        expect(store.index).toBeDefined()
    })
    it('Should have a show function', () => {
        expect(store.show).toBeDefined()
    })
    it('Should have a create function', () => {
        expect(store.create).toBeDefined()
    })

    it('Create function should add a product', async () => {
        const result = await store.create({name: 'Herbal Tea', price: 10, category: 'drinks'})
        expect(result).toEqual({id: 1, name: 'Herbal Tea', price: 10, category: 'drinks' })
    })
})