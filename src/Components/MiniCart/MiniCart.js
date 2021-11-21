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
import { MiniCartMain, MyBagLengthCounter, MyBagText, NoOfItemsText, NoProductsMiniCartDiv, NoProductsMiniCartText } from "./MiniCartStyledComponents";



class MiniCart extends PureComponent {


  render() {
    let noOfItems = this.props.cartInfo.length
    let cartItems = this.props.cartInfo
    return (
      <MiniCartMain id="mini-cart-main">
        {noOfItems === 0 ? (
          ""
        ) : (
          <MyBagLengthCounter>
            <MyBagText>My bag</MyBagText>
            <NoOfItemsText>
              {HowManyItems(noOfItems)}
            </NoOfItemsText>
          </MyBagLengthCounter>
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
          <NoProductsMiniCartDiv>
            <NoProductsMiniCartText>
              There are no products in your basket, add products to proceed your order.
            </NoProductsMiniCartText>
          </NoProductsMiniCartDiv>
        )}
      </MiniCartMain>
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
