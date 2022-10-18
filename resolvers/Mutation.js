const { v4: uuidv4 } = require('uuid')

exports.Mutation = {
    addCategory: ( parent, { input }, { db: { categories } }) => {
        const { name } = input
        const newCategory = {
            id: uuidv4(),
            name
        }
        categories.push(newCategory)
        return newCategory
    },
    addProduct: (parent, { input }, { db: { products } }) => {
        const {
            name,
            image,
            price,
            onSale,
            quantity,
            categoryId,
            description
        } = input
        
        const newProduct = {
            id: uuidv4(),
            name,
            image,
            price,
            onSale,
            quantity,
            categoryId,
            description            
        }
        
        products.push(newProduct)

        return newProduct
    },
    addReview: (parent, { input }, { db: { reviews } }) => {
        const {     
            date,
            title,
            comment,
            rating,
            productId
        } = input

        const newReview = {
            id: uuidv4(),
            date,
            title,
            comment,
            rating,
            productId            
        }

        reviews.push(newReview)

        return newReview
    },
    deleteCategory: (parent, { id }, { db: { products, categories } }) => {
        categories = categories.filter(category => category.id !== id )
        products = products.map(product => {
            if(product.categoryID === id) return { ...product, categoryID: null }
            else return product
        })
        return true
    },
    deleteProduct: (parent, { id }, { db: { products, reviews } }) => {
        products = products.filter(product => product.id !== id)
        reviews = reviews.filter(review => review.productId !== id)
        return true
    },
    deleteReview: (parent, { id}, { db: { reviews } }) => {
        reviews = reviews.filter(review => review.id !== id)
        return true
    },
    updateCategory: (parent, { id, input }, { db: { categories } }) => {
        const idx = categories.findIndex(category => category.id === id)
        if(idx === -1) return null
        categories[idx] = { ...categories[idx], ...input }
        return categories[idx]
    },
    updateProduct: (parent, { id, input }, { db: { products } }) => {
        const idx = products.findIndex(product => product.id === id)
        if(idx === -1) return null
        products[idx] = { ...products[idx], ...input }
        return products[idx]
    },
    updateReview: (parent, { id, input }, { db: { reviews } }) => {
        const idx = reviews.findIndex(review => review.id === id)
        reviews[idx] = { ...reviews[idx], ...input }
        return reviews[idx]
    }
}