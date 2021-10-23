import {
  addToCart,
  getPriceInTotal,
  removeFromCart,
} from "../redux/actions/actions";

import { getProductsPrices } from "../redux/selectors/ProductsSelector";
import styled from "styled-components";
import { Component } from "react";
import { connect } from "react-redux";
import { getCartData } from "../redux/selectors/CartSelectors";
import {
  currCurrencySymbol,
  currencyPick,
} from "../redux/selectors/CurrenciesSelector";

import MiniCartItem from "./MiniCartItem";

const CartMain = styled.div`
  padding: 1em 0 5em 3%;
  position: relative;
  z-index: 995;
  display: block;
  flex-wrap: wrap;
  grid-gap: 1em;
  flex-direction: column;
  overflow-y: auto;
`;

class MiniCart extends Component {
  componentDidMount() {}

  render() {
    return (
      <CartMain>
        {this.props.cartInfo.length === 0 ? (
          ""
        ) : (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p style={{ fontWeight: "800", margin: "0" }}>My bag</p>
            <p style={{ width: "80%", fontWeight: "300", margin: "0" }}>
              {", " + this.props.cartInfo.length}{" "}
              {this.props.cartInfo.length > 1 ? "items" : "item"}
            </p>
          </div>
        )}
        {this.props.cartInfo.length > 0 ? (
          this.props.cartInfo.map((product) => {
            return (
              <MiniCartItem
                currentCurrency={currencyPick}
                products={getProductsPrices}
                currencySymbol={currCurrencySymbol}
                removeFromCart={removeFromCart}
                addToCart={addToCart}
                getPriceInTotal={getPriceInTotal}
                attributes={product}
              />
            );
          })
        ) : (
          <>
            <p style={{ position: "absolute" }}>
              There are no products in your basket
            </p>
          </>
        )}
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

export default connect(mapStateToProps, null)(MiniCart);
