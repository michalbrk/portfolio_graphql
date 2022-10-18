exports.Category = {
    products: ({ id }, { filter }, { db: { products } }) => {
        products = products.filter(product => product.categoryID === id)

        if(filter) {
            if(filter.onSale === true) {
                products = products.filter(product => product.onSale)
            }
        }
        return products
    }
}