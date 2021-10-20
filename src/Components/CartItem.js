import { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  vectorleft,
  vectorright,
  vectordec,
  vectorinc,
  vectortrash,
} from "../assets/Vector";
import { addToCart, getPriceInTotal, removeFromCart } from "../redux/actions/actions";
import {
  currCurrencySymbol,
  currencyPick,
} from "../redux/selectors/CurrenciesSelector";
import { getProductsPrices } from "../redux/selectors/ProductsSelector";

const CartItemMain = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CartItemData = styled.div`
  width: 80%;

  border-top: 2px solid #e5e5e5;
`;
const CartItemValues = styled.div`
  width: 100%;
  display-direction: column;
`;
const AttributeValue = styled.label`
  display: flex;
  height: 100%;
  flex-wrap: no-wrap;
  grid-gap: 4px;
`;
const AttributeValue2 = styled.label`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid black;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
`;
const AttributeValue3 = styled.label`
  display: flex;
  flex-wrap: wrap;
  color: white;
  background-color: black;
  border: 1px solid black;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
`;

const AttributeName = styled.p`
  margin: 0.5rem;
`;
const QuantityButtons = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  cursor: pointer;
  background-color: white;

  padding: 0.4rem 0.3rem 0.8rem 0.3rem;
  box-sizing: border-box;
`;
const QuantityValues = styled.label`
  font-weight: 500;
  font-size: 24px;
`;

const QuantityCounter = styled.div`
  margin: 1rem;
  justify-content: center;
  grid-gap: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
`;
const PriceLabel2 = styled.label`
  padding: 0;
  margin: 0;
  width: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  text-align: left;
`;

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avaibleAttValues: Object.values(
        this.props.attributes.order.avaibleAttValues
      ),
      availbleAttKeys: Object.keys(
        this.props.attributes.order.avaibleAttValues
      ),
      imgs: this.props.attributes.order.imgs,
      counter: 0,
      refreshItemCart: false,
    };
  }

  
  nextPhoto = () => {
    if (this.state.counter < this.state.imgs[0].length - 1) {
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

  getTotalPrice = () => {
    const prices = document.getElementsByName('price-cart')
    const pricesValues = [];
    prices.forEach((price) => {
      let priceValue = parseFloat(price.getAttribute('value'));
      pricesValues.push(priceValue)
      
    });
    if(pricesValues.length !== 0) {
    let price = ((pricesValues.slice(0, -1)).reduce((prev, curr)=> prev + curr, 0)).toFixed(2)
    this.props.getPriceInTotal(price)
    }
  }

  increaseAmount = async () => {
    await this.props.addToCart(this.props.attributes.order)
    this.getTotalPrice();
   };

  decreaseAmount = async () => {
    
    await this.props.removeFromCart(this.props.attributes);
    
    if(this.props.attributes.quantity !== 0) {
    return this.getTotalPrice();
    } else {
      return this.props.getPriceInTotal("0")
    }
     
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
        counter: this.state.imgs[0].length - 1,
      });
    }
  };
  componentDidUpdate() {
    this.getTotalPrice();
  }

  componentDidMount() {
    this.getTotalPrice();
  }

  render() {
    return (
      <CartItemMain>
        <CartItemData>
          <CartItemValues>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  width: "55%",
                }}
              >
                <p>{this.props.attributes.order.name}</p>
                <p>
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
                          <PriceLabel2 name="price-cart">
                            {this.props.currencySymbol +
                              (
                                price.amount *
                                this.props.attributes.quantity
                              ).toFixed(2)}
                          </PriceLabel2>
                        ));
                    })}
                </p>
              </div>
              <QuantityCounter>
                <QuantityButtons onClick={() => this.increaseAmount()}>
                  <label
                    style={{
                      position: "absolute",
                      margin: "0.2rem 0 0 0.5rem",
                    }}
                  >
                    {vectorinc}
                  </label>
                  {vectordec}
                </QuantityButtons>
                <QuantityValues>
                  {this.props.attributes.quantity}
                </QuantityValues>
                <QuantityButtons
                  value={this.props.attributes.quantity}
                  onClick={(e) => this.decreaseAmount(e)}
                >
                  {this.props.attributes.quantity === 1
                    ? vectortrash
                    : vectordec}
                </QuantityButtons>
              </QuantityCounter>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <label
                  onClick={() => this.prevPhoto()}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    alignSelf: "center",
                    marginLeft: "1rem",
                  }}
                >
                  {vectorleft}
                </label>
                <img
                  style={{ width: "7.5rem", display: "flex" }}
                  src={this.state.imgs[0][this.state.counter]}
                  alt=""
                />
                <label
                  onClick={() => this.nextPhoto()}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    alignSelf: "center",
                    marginLeft: "5rem",
                  }}
                >
                  {vectorright}
                </label>
              </div>
            </div>
            {this.state.avaibleAttValues.map((value, i) => {
              let key = this.state.availbleAttKeys;
              let values = Object.entries(this.props.attributes.order).slice(3);
              return (
                <>
                  <AttributeName>{key[i].toUpperCase()} :</AttributeName>
                  <AttributeValue>
                    {value.map((item) => {
                      return values[i].includes(item) ? (
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
    getPriceInTotal: (price) => dispatch(getPriceInTotal(price))
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
