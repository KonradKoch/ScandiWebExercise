import { PureComponent } from "react";
import { connect } from "react-redux";

import {
  vectorleft,
  vectorright,
  vectordec,
  vectorinc,
  vectortrash,
} from "../../assets/Vector";
import {
  addToCart,
  getPriceInTotal,
  removeFromCart,
} from "../../redux/actions/actions";
import {
  currCurrencySymbol,
  currencyPick,
} from "../../redux/selectors/CurrenciesSelector";
import { getProductsPrices } from "../../redux/selectors/ProductsSelector";
import divideTheName from "../../utilities/DivideTheName";
import { AttributeName, AttributeValue, AttributeValue2, AttributeValue3, CartItemMain, CartItemValues, CartProductPic, FirstNameText, ImageSliderContainer, ImagesSliderControl, IncreaseAmountLabel, NextProductPic, PreviousProductPic, PriceContainer, PriceLabel2, ProductAttributesCartContainer, QuantityAndPicContainer, QuantityButtons, QuantityCounter, QuantityValues, SecondNameText } from "./CartItemStyledComponents";


class CartItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  nextPhoto = () => {
    if (this.state.counter < this.props.attributes.order.imgs[0].length - 1) {
      this.setState({
        ...this.state,
        counter: this.state.counter + 1,
      });
    } else {
      this.setState({
        ...this.state,
        counter: 0,
      });
    }
  };



  increaseAmount = () => {
    this.props.addToCart(this.props.attributes.order);
  };

  decreaseAmount = () => {
    this.props.removeFromCart(this.props.attributes);
  };

  prevPhoto = () => {
    if (this.state.counter) {
      this.setState({
        ...this.state,
        counter: this.state.counter - 1,
      });
    } else {
      this.setState({
        ...this.state,
        counter: this.props.attributes.order.imgs[0].length - 1,
      });
    }
  };
  

 

  render() {
    let productAttributes = this.props.attributes.order;
    let productQuantity = this.props.attributes.quantity;
    let {firstName, secondName} = divideTheName(productAttributes.name);
    let avaibleAttValues = Object.values(productAttributes.avaibleAttValues);
    
    return (
      <CartItemMain>
        
          <CartItemValues>
           
              <ProductAttributesCartContainer
              >
                <FirstNameText>{firstName}</FirstNameText><SecondNameText>{secondName}</SecondNameText>
                <PriceContainer>
                  {this.props.products
                    .filter(
                      (product) =>
                        product.name === productAttributes.name
                    )
                    .map((product) => {
                      return product.prices
                        .filter(
                          (price) =>
                            price.currency === this.props.currentCurrency
                        )
                        .map((price) => (
                          <PriceLabel2 name="price-cart">
                            {this.props.currencySymbol +
                              (
                                price.amount * productQuantity
                              ).toFixed(2)}
                          </PriceLabel2>
                        ));
                    })}
                </PriceContainer>
                {avaibleAttValues.map((value, i) => {
              let key = Object.keys(
                productAttributes.avaibleAttValues
              );
              let values = Object.entries(productAttributes).slice(3);
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
              </ProductAttributesCartContainer>
              <QuantityAndPicContainer>
              <QuantityCounter>
                <QuantityButtons onClick={() => this.increaseAmount()}>
                  <IncreaseAmountLabel
                  >
                    {vectorinc}
                  </IncreaseAmountLabel>
                  {vectordec}
                </QuantityButtons>
                <QuantityValues>
                  {productQuantity}
                </QuantityValues>
                <QuantityButtons
                  value={productQuantity}
                  onClick={(e) => this.decreaseAmount(e)}
                >
                  {productQuantity === 1
                    ? vectortrash
                    : vectordec}
                </QuantityButtons>
              </QuantityCounter>
              <ImageSliderContainer>
              
                <CartProductPic
                  unselectable="on" 
                  src={productAttributes.imgs[0][this.state.counter]}
                  alt="This one is currently unavailable, try again later."
                />
                <ImagesSliderControl>
                <PreviousProductPic
                  onClick={() => this.prevPhoto()}
                  
                >
                  {vectorleft}
                </PreviousProductPic>
                <NextProductPic 
                  onClick={() => this.nextPhoto()}
                  
                >
                  {vectorright}
                </NextProductPic>
                </ImagesSliderControl>
              </ImageSliderContainer>
              </QuantityAndPicContainer>
           
          </CartItemValues>
        
      </CartItemMain>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (order) => dispatch(addToCart(order)),
    removeFromCart: (order) => dispatch(removeFromCart(order)),
  };
};

const mapStateToProps = (state) => {
  return {
    currentCurrency: currencyPick(state),
    currencySymbol: currCurrencySymbol(state),
    products: getProductsPrices(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
