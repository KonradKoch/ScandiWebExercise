export const getCartData = (state) => {
   
    const cartInfo = state.shoppingCart;
    return cartInfo;
}

export const priceInTotal = (state) => {   
    return state.priceInTotal;
}

