
import { addToCart, removeFromCart } from "../redux/actions/actions"

import { getProductsPrices } from "../redux/selectors/ProductsSelector"
import styled from "styled-components";
import { Component } from "react";
import { connect } from "react-redux";
import { getCartData } from "../redux/selectors/CartSelectors";
import { currCurrencySymbol, currencyPick } from "../redux/selectors/CurrenciesSelector";

import MiniCartItem from "./MiniCartItem";


const CartMain = styled.div`
    padding: 0 0 0 3%;
    display: flex;
    flex-wrap: wrap;
    grid-gap: 10px;
    flex-direction: column;
    
    `


class MiniCart extends Component {

    componentDidMount() {
        
        
    }

    render() {
        return (
            <CartMain>
                <p>CART</p>
        {(this.props.cartInfo.length > 0)? this.props.cartInfo.map((product) => {
            return (
                <MiniCartItem currentCurrency={currencyPick} products={getProductsPrices} currencySymbol={currCurrencySymbol} removeFromCart={removeFromCart} addToCart={addToCart} attributes={product}/>
                
                )
                
        }): "There are no products in your basket."}
        </CartMain>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        cartInfo: getCartData(state),
        currentCurrency: currencyPick(state),
        currencySymbol: currCurrencySymbol(state) 
    }
}


export default connect(mapStateToProps, null)(MiniCart)