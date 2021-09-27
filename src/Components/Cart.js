import { Component } from "react";
import { connect } from "react-redux";
import { getCartData } from "../redux/selectors/CartSelectors";
import { currCurrencySymbol, currencyPick } from "../redux/selectors/CurrenciesSelector";
import { getProductAttributes, getProductDetailsData } from "../redux/selectors/ProductsSelector";
import CartItem from "./CartItem";
import styled from "styled-components";

const CartMain = styled.div`
    padding: 5em 0 0 3%;
    display: flex;
    flex-wrap: wrap;
    grid-gap: 10px;
    flex-direction: column;
    `


class Cart extends Component {

    componentDidMount() {
        
        
    }

    render() {
        return (
            <CartMain>
                <p>CART</p>
        {this.props.cartInfo.map((product) => {
            return (
                <CartItem attributes={product}/>
                
                )
                
        })}
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


export default connect(mapStateToProps, null)(Cart)
