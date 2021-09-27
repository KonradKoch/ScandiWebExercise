export const currencyPick = (state) => {
    return state.currentCurrency;
}

export const currCurrencySymbol = (state) => {
    return state.currencySymbol;
}

export const currentPrice = (state) => {
    const allPrices = state.prices
    return allPrices.filter((price)=> state.currentCurrency === price.currency)
}