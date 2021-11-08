import { PureComponent } from "react";
import { connect } from "react-redux";
import { getCartData } from "../../redux/selectors/CartSelectors";
import {
  currCurrencySymbol,
  currencyPick,
} from "../../redux/selectors/CurrenciesSelector";
import { getProductsPrices } from "../../redux/selectors/ProductsSelector";
import CartItem from "../CartItem/CartItem";

import {
  addToCart,
  getPriceInTotal,
  removeFromCart,
} from "../../redux/actions/actions";
import { CartLabel, CartMain } from "./CartStyledComponents";




class Cart extends PureComponent {
 

  render() {
    return (
      <CartMain>
        <CartLabel>CART</CartLabel>
        {this.props.cartInfo.length > 0
          ? this.props.cartInfo.map((product) => {
              return (
                <CartItem
                  getPriceInTotal={getPriceInTotal}
                  currentCurrency={currencyPick}
                  products={getProductsPrices}
                  currencySymbol={currCurrencySymbol}
                  removeFromCart={removeFromCart}
                  addToCart={addToCart}
                  attributes={product}
                />
              );
            })
          : <p style={{  margin: "0", flexWrap: "wrap", width: "50%"}}>
          There are no products in your basket, add products to proceed your order.
        </p>}
      </CartMain>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    cartInfo: getCartData(state),
    currentCurrency: currencyPick(state),
    currencySymbol: currCurrencySymbol(state),
  };
};

export default connect(mapStateToProps)(Cart);
