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

const CartItemMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em 0 1em 0;
`;

const CartItemData = styled.div`
  width: 95%;

  
`;
const CartItemValues = styled.div`
  width: 100%;
  display-direction: column;
`;
const AttributeValue = styled.label`
  display: flex;
  font-family: Source Sans Pro, sans-serif;
  font-weight: 400;
  font-size: 14px;
  height: auto;
  margin: 0.25rem;
  flex-wrap: wrap;
  grid-gap: 4px;
`;
const AttributeValue2 = styled.label`
  display: flex;
  flex-wrap: wrap;
 
  border: 1px solid grey;
  color: rgba(166, 166, 166, 1);
  background-color: rgba(0, 0, 0, 0.15);
  padding: 0.1rem 0.35rem 0.1rem 0.35rem;
`;
const AttributeValue3 = styled.label`
  display: flex;
  flex-wrap: wrap;
  
  color: black;
  background-color: white;
  border: 1px solid black;
  padding: 0.1rem 0.35rem 0.1rem 0.35rem;
`;

const AttributeName = styled.p`
  margin: 0.5rem;
  font-weight: 300;
  font-size: 13px;
  margin: 0.5rem 0 0.1rem 0;
`;
const QuantityButtons = styled.button`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  background-color: white;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
`;
const QuantityValues = styled.label`
  font-weight: 500;
  font-size: 24px;
`;

const QuantityCounter = styled.div`
  margin: 0 0.5rem 0 0;
  justify-content: space-between;
  
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
  
  font-size: 16px;
  line-height: 160%;
  text-align: left;
`;

class MiniCartItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      
      imgs: this.props.attributes.order.imgs,
      counter: 0,
    };
  }

  // nextPhoto = () => {
  //   if (this.state.counter < this.state.imgs[0].length - 1) {
  //     this.setState({
  //       ...this.state,
  //       counter: this.state.counter + 1,
  //     });
  //   } else {
  //     this.setState({
  //       ...this.state,
  //       counter: 0,
  //     });
  //   }
  // };

  // prevPhoto = () => {
  //   if (this.state.counter) {
  //     this.setState({
  //       ...this.state,
  //       counter: this.state.counter - 1,
  //     });
  //   } else {
  //     this.setState({
  //       ...this.state,
  //       counter: this.state.imgs[0].length - 1,
  //     });
  //   }
  // };

  getTotalPrice = async () => {
    let prices = document.getElementsByName("price");
    let pricesValues = [];

    prices.forEach((price) => {
      let priceValue = parseFloat(price.getAttribute("value"));
      pricesValues.push(priceValue);
    });
    if (pricesValues.length !== 1) {
      const price = pricesValues.reduce((prev, curr) => prev + curr).toFixed(2);
      this.props.getPriceInTotal(price);
    } else if (pricesValues.length === 1) {
      const price = pricesValues.reduce((prev, curr) => prev + curr).toFixed(2);
      this.props.getPriceInTotal(price);
    } else {
      this.props.getPriceInTotal("0");
    }
  };

  increaseAmount = async () => {
    await this.props.addToCart(this.props.attributes.order);
    this.getTotalPrice();
  };

  decreaseAmount = async () => {
    await this.props.removeFromCart(this.props.attributes);

    if (this.props.attributes.quantity !== 1) {
      return this.getTotalPrice();
    } else {
      return this.props.getPriceInTotal("0");
    }
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
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  width: "55%",
                }}
              >
                <p style={{fontWeight: "300", margin: "0"}}>{firstName}</p>
                <p style={{fontWeight: "300", margin: "0"}}>{secondName}</p>
                <div>
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
                </div>
                
              </div>
              
              <QuantityCounter>
                <QuantityButtons onClick={() => this.increaseAmount()}>
                  <label
                    style={{
                      position: "absolute",
                      margin: "0rem 0 0 0rem",
                    }}
                  >
                    {vectorincmini}
                  </label>
                  <label
                    style={{
                      position: "absolute",
                      margin: "-0.15rem 0 0.1rem 0rem",
                    }}
                  >
                    {vectordecmini}
                  </label>
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
                    <label
                      style={{
                        position: "absolute",
                        margin: "-0.15rem 0 0.1rem 0rem",
                      }}
                    >
                      {vectordecmini}
                    </label>
                  )}
                </QuantityButtons>
              </QuantityCounter>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <img
                  style={{ width: "105px", display: "flex", height: "fit-content"}}
                  src={this.props.attributes.order.imgs[0][this.state.counter]}
                  alt=""
                />
              </div>
            </div>
            
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