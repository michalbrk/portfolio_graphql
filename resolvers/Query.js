exports.Query = {
    hello: (parent, args, context) => "World",
    products: (
        parent, 
        { filter }, 
        { db: { products, reviews } }
    ) => {
        if(filter) {
            const { onSale, avgRating } = filter
            if(onSale) {
                products = products.filter(product => { 
                    return product.onSale 
                })
            }
            if([1,2,3,4,5].includes(avgRating)) {
                products = products.filter(product => {
                    let sum = 0
                    let reviewsNum = 0
                    reviews.forEach(review => {
                        if(review.productId === product.id) {
                            reviewsNum++
                            sum += review.rating
                        }
                    })
                    const avgProductRating = sum / reviewsNum

                    return avgProductRating >= avgRating
                })
            }
        }
        return products
    },
    product: (parent, { id }, { db: { products } }) => {
        return products.find(product => product.id === id)
    },
    categories: (parent, args, { db: { categories } }) => categories,
    category: (parent, { id }, { db: { categories } }) => {
        return categories.find(category => category.id === id)
    }
}