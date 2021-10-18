import { Component } from "react";
import { connect } from "react-redux";
import { getCartData } from "../redux/selectors/CartSelectors";
import { currCurrencySymbol, currencyPick } from "../redux/selectors/CurrenciesSelector";
import { getProductsPrices } from "../redux/selectors/ProductsSelector";
import CartItem from "./CartItem";
import styled from "styled-components";
import { addToCart, getPriceInTotal, removeFromCart } from "../redux/actions/actions";

const CartMain = styled.div`
    padding: 5em 0 0 3%;
    display: flex;
    flex-wrap: wrap;
    grid-gap: 20px;
    flex-direction: column;
    `


class Cart extends Component {


    getTotalPrice = async () => {
        const pricesValues = [];
        const prices = document.getElementsByName('price')
        
        prices.forEach((price) => {
          let priceValue = parseFloat(price.getAttribute('value'));
          pricesValues.push(priceValue)
          
        });
        if(pricesValues.length !== 1 && pricesValues.length !== 0) {
          
        const price = ((pricesValues.slice(0, -1)).reduce((prev, curr)=> prev + curr)).toFixed(2)
        this.props.getPriceInTotal(price)
        }
      }
    componentDidMount() {
        this.getTotalPrice();
        
    }

    componentDidUpdate() {
        this.getTotalPrice();
    }

    render() {
        return (
            <CartMain>
                <p>CART</p>
        {(this.props.cartInfo.length > 0)? this.props.cartInfo.map((product) => {
            return (
                
                <CartItem getPriceInTotal={getPriceInTotal} currentCurrency={currencyPick} products={getProductsPrices} currencySymbol={currCurrencySymbol} removeFromCart={removeFromCart} addToCart={addToCart} attributes={product}/>
               
                )
                
        }): "There are no products in your basket."}
        </CartMain>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getPriceInTotal: (price) => dispatch(getPriceInTotal(price))
    };
  };

const mapStateToProps = (state) => {
    return {
        cartInfo: getCartData(state),
        currentCurrency: currencyPick(state),
        currencySymbol: currCurrencySymbol(state) 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart)
