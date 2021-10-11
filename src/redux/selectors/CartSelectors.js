export const getCartData = (state) => {
   
    const cartInfo = state.shoppingCart;
    return cartInfo;
}

export const priceInTotal = (state) => {
    const priceInTotal = state.priceInTotal;
    
    return state.priceInTotal;
}

