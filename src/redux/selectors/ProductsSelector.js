export const getProductsSelector = (state) => {
    const allProducts = state.products;
    
        return allProducts.filter((product) => state.pickedCategory === product.category);

   
}

export const getSelectedProduct = (state) => {
    return state.selectedProduct;
}

export const getProductDetailsData = (state) => {
    const allProducts = state.products;
    return allProducts.filter((product) => state.selectedProduct === product.name)
}


export const getProductAttributes = (state) => {
    const allData = state.products["attributes"];
    return allData;
}
// export const getCartProductData = (state) => {
//     const allProducts = state.products;
//     return allProducts.filter((product) => )
// }
export const getProductsPrices = (state) => {
    const pricesData = state.products;
    return pricesData
}