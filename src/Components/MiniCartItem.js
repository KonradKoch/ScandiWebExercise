import { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  vectorleft,
  vectorright,
  vectordec,
  vectorinc,
  vectortrash,
  vectorincmini,
  vectordecmini,
  vectortrashmini,
} from "../assets/Vector";
import { addToCart, removeFromCart } from "../redux/actions/actions";
import {
  currCurrencySymbol,
  currencyPick,
} from "../redux/selectors/CurrenciesSelector";
import { getProductsPrices } from "../redux/selectors/ProductsSelector";

const CartItemMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em 0 1em 0;
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
  border: 1px solid grey;
  color: rgba(166, 166, 166, 1);
  background-color: rgba(0, 0, 0, 0.15);
  padding: 0.10rem 0.35rem 0.10rem 0.35rem;
`;
const AttributeValue3 = styled.label`
  display: flex;
  flex-wrap: wrap;
  color: black;
  background-color: white;
  border: 1px solid black;
  padding: 0.10rem 0.35rem 0.10rem 0.35rem;
`;

const AttributeName = styled.p`
  margin: 0.5rem;
`;
const QuantityButtons = styled.button`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  background-color: white;
    display:flex;
  justify-content: space-around;
  box-sizing: border-box;
`;
const QuantityValues = styled.label`
  font-weight: 500;
  font-size: 24px;
`;

const QuantityCounter = styled.div`
  margin: 0.5rem;
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

class MiniCartItem extends Component {
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

  getAttValues() {
    // let attributesValues = [];
    // let attributes = document.getElementsByName("att-values")
    // let attributesNum = document.getElementsByName("att-values").length
    // for(let i=0; i<attributesNum; i++) {
    //     attributesValues.push(attributes[i].getAttribute("value"))
    // }
    // let found = attributesValues.filter((att)=> {
    //     return this.state.pickedAttributes.indexOf(att) !== -1;
    // })
    // console.log(this.state.pickedAttributes)
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
  increaseAmount = () => {
    return this.props.addToCart(this.props.attributes.order);
  };
  decreaseAmount = () => {
    return this.props.removeFromCart(this.props.attributes);
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
  componentDidMount() {
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
                          <PriceLabel2 name="price">
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
                      margin: "0rem 0 0 0rem",
                    }}
                  >
                    {vectorincmini}
                  </label>
                  <label style={{
                      position: "absolute",
                      margin: "-0.15rem 0 0.1rem 0rem",
                    }}>{vectordecmini}</label>
                </QuantityButtons>
                <QuantityValues>
                  {this.props.attributes.quantity}
                </QuantityValues>
                <QuantityButtons
                  value={this.props.attributes.quantity}
                  onClick={(e) => this.decreaseAmount(e)}
                >
                  {this.props.attributes.quantity === 1
                    ? vectortrashmini
                    : (<label style={{
                        position: "absolute",
                        margin: "-0.15rem 0 0.1rem 0rem",
                      }}>{vectordecmini}</label>)}
                </QuantityButtons>
              </QuantityCounter>
              <div style={{ display: "flex", flexDirection: "row" }}>
                
                <img
                  style={{ width: "7.5rem", display: "flex" }}
                  src={this.state.imgs[0][this.state.counter]}
                />
                
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
  };
};

const mapStateToProps = (state) => {
  return {
    currentCurrency: currencyPick(state),
    currencySymbol: currCurrencySymbol(state),
    products: getProductsPrices(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCartItem);