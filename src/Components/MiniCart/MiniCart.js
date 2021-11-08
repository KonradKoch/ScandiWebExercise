import {
  addToCart,
  getPriceInTotal,
  removeFromCart,
} from "../../redux/actions/actions";

import { getProductsPrices } from "../../redux/selectors/ProductsSelector";
import styled from "styled-components";
import { PureComponent } from "react";
import { connect } from "react-redux";
import { getCartData } from "../../redux/selectors/CartSelectors";
import {
  currCurrencySymbol,
  currencyPick,
} from "../../redux/selectors/CurrenciesSelector";

import MiniCartItem from "../MiniCartItem/MiniCartItem";
import { HowManyItems } from "../../utilities/HowManyItems";

const CartMain = styled.div`
  padding: 1em 0 1em 3%;
  display: grid;
  align-content: center;
  align-items: baseline;
  position: relative;
  z-index: 995;
  height: calc(40% + 15rem);
  display: block;
  flex-wrap: wrap;
  grid-gap: 1em;
  flex-direction: column;
  overflow-y: auto;
`;

class MiniCart extends PureComponent {
  componentDidMount() {}

  render() {
    let noOfItems = this.props.cartInfo.length
    let cartItems = this.props.cartInfo
    return (
      <CartMain id="mini-cart-main">
        {noOfItems === 0 ? (
          ""
        ) : (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p style={{ fontWeight: "800", margin: "0" }}>My bag</p>
            <p style={{ width: "80%", fontWeight: "300", margin: "0" }}>
              {HowManyItems(noOfItems)}
            </p>
          </div>
        )}
        {noOfItems > 0 ? (
          cartItems.map((product) => {
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
          <div>
            <p style={{  margin: "0"}}>
              {`There are no products in your basket, add products to proceed your order.`}
            </p>
          </div>
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
