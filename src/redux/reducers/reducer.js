import * as actions from "../actions/actions";


const initialState = {
    products: [],
    pickedCategory: "clothes",
    currentCurrency: "USD",
    currencySymbol: "$",
    selectedProduct: "",
    shoppingCart: []
}

export const reducer = (state = initialState, {type, payload}) => {
    
    switch (type) {
        
        case actions.PICK_CATEGORY:
            return { ...state,
                pickedCategory: payload.value,
            }
        case actions.GET_PRODUCTS:
            return { ...state,
                products: payload.products,
            }
        case actions.GET_PRODUCT_DETAILS:
            return { ...state,
                selectedProduct:  payload.selectedProduct
            }
        case actions.GET_CURRENCY:
            return { ...state,
                    currentCurrency: payload.currency    
            }
        case actions.GET_CURRENCY_SYMBOL:
            return { ...state,
                    currencySymbol: payload.currencySymbol
            }
        case actions.ADD_TO_CART:
            
            let item = state.shoppingCart.find(product => JSON.stringify(product.order) === JSON.stringify(payload.order));
            

            if(item) {
                return {...state,
                shoppingCart: state.shoppingCart.map((product)=> JSON.stringify(product.order) === JSON.stringify(payload.order) ? { 
                    ...product,
                    quantity: product.quantity + payload.quantity
                }
                : product
                )};

            } else  {
                return {
                    ...state,
                    shoppingCart: [...state.shoppingCart, payload]
                }
            }
        case actions.REMOVE_FROM_CART:
            const item2 = state.shoppingCart.find(product => JSON.stringify(product.order) === JSON.stringify(payload.order.order));
            const index = state.shoppingCart.findIndex(item => item.order === payload.order.order)
        
            if(item2.quantity > 1) {
                return {...state,
                shoppingCart: state.shoppingCart.map((product)=> JSON.stringify(product.order) === JSON.stringify(payload.order.order) ? { 
                    ...product,
                    quantity: product.quantity - 1
                }
                : product
                )};

            } else {
                let orders = state.shoppingCart.filter(product => JSON.stringify(payload.order.order) !== JSON.stringify(product.order))
                return {...state, 
                shoppingCart: [...orders]
                }
            }    
            
            
        default:
            return state;
    }
}