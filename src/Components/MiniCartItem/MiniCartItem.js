import { PureComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  vectorincmini,
  vectordecmini,
  vectortrashmini,
} from "../../assets/Vector";
import {
  addToCart,
  removeFromCart,
  getPriceInTotal,
} from "../../redux/actions/actions";
import { priceInTotal } from "../../redux/selectors/CartSelectors";
import {
  currCurrencySymbol,
  currencyPick,
} from "../../redux/selectors/CurrenciesSelector";
import { getProductsPrices } from "../../redux/selectors/ProductsSelector";
import divideTheName from "../../utilities/DivideTheName";
import { AttributeName, AttributeValue, AttributeValue2, AttributeValue3, CartItemData, CartItemMain, CartItemValues, MiniCartImgContainer, MiniCartProductImg, MiniCartProductNameLabel, MiniVectorDecLabel, MiniVectorIncLabel, OrderAttributesSection, OrderNamePriceAttributesContainer, PriceLabel2, QuantityButtons, QuantityCounter, QuantityValues } from "./MiniCartItemStyledComponents";



class MiniCartItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  getTotalPrice = () => {
    let prices = document.getElementsByName("price");
    let pricesValues = [];

    prices.forEach((price) => {
      let priceValue = parseFloat(price.getAttribute("value"));
      pricesValues.push(priceValue);
    });
    if (pricesValues.length > 1) {
      const price = pricesValues.reduce((prev, curr) => prev + curr).toFixed(2);
      this.props.getPriceInTotal(price);
    } else if (pricesValues.length === 1) {
      const price = pricesValues.reduce((prev, curr) => prev + curr).toFixed(2);
      this.props.getPriceInTotal(price);
    } else {
      this.props.getPriceInTotal("0");
    }
  };

  increaseAmount = () => {
    this.props.addToCart(this.props.attributes.order);
  };

  decreaseAmount = async () => {
    await this.props.removeFromCart(this.props.attributes);
    this.getTotalPrice();
  };

  componentDidUpdate() {
    this.getTotalPrice();
  }

  componentDidMount() {
    this.getTotalPrice();
  }

  render() {
    let avaibleAttValues = Object.values(
      this.props.attributes.order.avaibleAttValues
    );
    let {firstName, secondName} = divideTheName(this.props.attributes.order.name)

    return (
      <CartItemMain>
        <CartItemData>
          <CartItemValues>
            <OrderAttributesSection>
              <OrderNamePriceAttributesContainer
              >
                <MiniCartProductNameLabel>{firstName}</MiniCartProductNameLabel>
                <MiniCartProductNameLabel>{secondName}</MiniCartProductNameLabel>
              
                  {this.props.products
                    .filter(
                      (product) =>
                        product.name === this.props.attributes.order.name
                    )
                    .map((product) => {
                      return product.prices
                        .filter(
                          (price) =>
                            price.currency === this.props.currentCurrency
                        )
                        .map((price) => (
                          <PriceLabel2
                            name="price"
                            value={
                              price.amount *
                              this.props.attributes.quantity.toFixed(2)
                            }
                          >
                            {this.props.currencySymbol +
                              (
                                price.amount * this.props.attributes.quantity
                              ).toFixed(2)}
                          </PriceLabel2>
                        ));
                    })}
                    {avaibleAttValues.map((value, i) => {
              const key = Object.keys(
                this.props.attributes.order.avaibleAttValues
              );
              const values = Object.entries(this.props.attributes.order).slice(
                3
              );
              return (
                <>
                  <AttributeName>{key[i].toUpperCase()} :</AttributeName>
                  <AttributeValue>
                    {value.map((item) => {
                      const AttValues = values[i].includes(item);
                      return AttValues ? (
                        <AttributeValue3 name="att-values" value={item}>
                          {item}
                        </AttributeValue3>
                      ) : (
                        <AttributeValue2 name="att-values" value={item}>
                          {item}
                        </AttributeValue2>
                      );
                    })}
                  </AttributeValue>
                </>
              );
            })}
              
                
              </OrderNamePriceAttributesContainer>
              
              <QuantityCounter>
                <QuantityButtons onClick={() => this.increaseAmount()}>
                  <MiniVectorIncLabel
                  >
                    {vectorincmini}
                  </MiniVectorIncLabel>
                  <MiniVectorDecLabel
                  >
                    {vectordecmini}
                  </MiniVectorDecLabel>
                </QuantityButtons>
                <QuantityValues>
                  {this.props.attributes.quantity}
                </QuantityValues>
                <QuantityButtons
                  value={this.props.attributes.quantity}
                  onClick={(e) => this.decreaseAmount(e)}
                >
                  {this.props.attributes.quantity === 1 ? (
                    vectortrashmini
                  ) : (
                    <MiniVectorDecLabel
                    >
                      {vectordecmini}
                    </MiniVectorDecLabel>
                  )}
                </QuantityButtons>
              </QuantityCounter>
              <MiniCartImgContainer>
                <MiniCartProductImg
                  src={this.props.attributes.order.imgs[0][this.state.counter]}
                  alt="Sorry, something went wrong..."
                />
              </MiniCartImgContainer>
            </OrderAttributesSection>
            
          </CartItemValues>
        </CartItemData>
      </CartItemMain>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (order) => dispatch(addToCart(order)),
    removeFromCart: (order) => dispatch(removeFromCart(order)),
    getPriceInTotal: (price) => dispatch(getPriceInTotal(price)),
  };
};

const mapStateToProps = (state) => {
  return {
    currentCurrency: currencyPick(state),
    currencySymbol: currCurrencySymbol(state),
    products: getProductsPrices(state),
    totalPrice: priceInTotal(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCartItem);
