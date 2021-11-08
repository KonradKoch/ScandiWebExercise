import { PureComponent, Fragment } from "react";
import styled from "styled-components";
import { addToCart, getPriceInTotal } from "../../redux/actions/actions";
import { connect } from "react-redux";
import {
  getProductDetailsData,
  getSelectedProduct,
} from "../../redux/selectors/ProductsSelector";
import { Link, NavLink } from "react-router-dom";
import {
  currCurrencySymbol,
  currencyPick,
} from "../../redux/selectors/CurrenciesSelector";
import { getCartData } from "../../redux/selectors/CartSelectors";
import Interweave from "interweave";
import divideTheName from "../../utilities/DivideTheName";

const MainProductCard = styled.div`
  padding: 7rem 0 0 3%;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 10px;
  justify-content: space-around;
  margin-bottom: 1rem;
`;
const PhotoSection = styled.div`
  display: flex;
  
  
  grid-gap: 7px;
  width: 30em;
`;

const ImagesContainer = styled.div`
  display: flex;
  
  flex-direction: column;
  grid-gap: 20px;
`;

const MainImage = styled.img`
  width: 80%;
  height: fit-content;
  
`;
const ImgMiniature = styled.img`
  width: 3.5em;
  height: 4em;
`;

const ProductDataContainer = styled.div`
  flex-wrap: wrap;
  margin: 2rem 0 2rem 0;
`;

const ProductName = styled.label`
  font-weight: 600;
  font-size: 30px;
`;

const ProductAttributeName = styled.p`
  width: fit-content;
  height: content-fit;
  text-transform: uppercase;

  font-family: Roboto Condensed;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 18px;
`;
const ProductAttributeValues = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const ProductAttributesContainer = styled.div`
  width: fit-content;
`;

const AttributeValue = styled.label`
  cursor: pointer;
  width: 63px;
  height: 45px;
  border: 1px solid black;
  font-family: Source Sans Pro;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.05em;
  margin: 0.3rem 0.5rem 0 0;
`;

const PRICE = styled.p`
  margin: 3rem 0 1rem 0;
  width: 38px;
  height: 18px;
  text-transform: uppercase;

  font-family: Roboto Condensed;
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 18px;
`;

const PriceLabel2 = styled.label`
  padding: 0;
  margin: 0;
  width: 100%;
  font-family: Raleway;
font-style: normal;
font-weight: bold;
font-size: 24px;
line-height: 18px;
  text-align: left;
`;

const AddToCartButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  align-self: center;
  width: 292px;
  height: 52px;
  
  background: lighgrey;
  font-family: Raleway;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: grey;
`;

class ProductCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.getSelectedProduct,
      avaibleAttValues: {},
      imgs: this.props.products.map((product) => product.gallery),
      shoppingDisabled: true,
    };
  }



  handleAttributePick = async (e) => {
    let AttributesNumber = document.getElementsByName("attribute-name").length;
    let pickedAttributeValue = e.target.getAttribute("value");
    let pickedAttributeName = e.target.getAttribute("name");
    let allAttributes = document.getElementsByName(pickedAttributeName);
    let objectAsArray = (obj) =>
      Object.keys(this.state).map((key) => [key, obj[key]]);
    const attributes = [];


    allAttributes.forEach((attribute) => {
      attributes.push(attribute.getAttribute('value'))
      attribute.style.backgroundColor = "white";
      attribute.style.color = "black";
    });

    if (pickedAttributeName) {
      e.target.style.backgroundColor = "black";
      e.target.style.color = "white";

      await this.setState({
        ...this.state,
        [pickedAttributeName.toLowerCase()]: pickedAttributeValue,
        avaibleAttValues: {
          ...this.state.avaibleAttValues,
          [pickedAttributeName.toLowerCase()]: attributes,
        },
      });
    }

    if (
      Number(objectAsArray(this.state).length) - 4 ===
      Number(AttributesNumber)
    ) {
      let button = document.getElementsByName("add-to-cart");
      this.setState({
        ...this.state,

        shoppingDisabled: false,
      });
      button.forEach((button) => {
        button.style.color = "white";
        button.style.backgroundColor = "#5ECE7B";
        button.style.cursor = "pointer";
      });
    }
  }

  handleNoAtt() {
    const AttributesNumber =
      document.getElementsByName("attribute-name").length;
    const attributesNames = [];
    
    for (let i = 0; i < AttributesNumber; i++) {
      attributesNames.push(
        document.getElementsByName("attribute-name")[i].attributes[0].value
      );
    }
    if (attributesNames.length === 0) {
      let button = document.getElementsByName("add-to-cart");

      this.setState({
        ...this.state,
        shoppingDisabled: !this.state.shoppingDisabled,
      });
      button.forEach((button) => {
        button.style.color = "white";
        button.style.backgroundColor = "#5ECE7B";
        button.style.cursor = "pointer";
      });
    } else {
      const firstValues = [];
      const valuesContainer = document.getElementsByName('attributes-values-container');
      valuesContainer.forEach((value) => {
        firstValues.push(value.firstChild);
        
      })
      for (let i = 0; i <valuesContainer.length; i ++) {
        setTimeout(() => {
          firstValues[i].click();
        }, 50)
        
      }
      
      
    }
  }

  getTotalPrice = () => {
    let prices = document.getElementsByName('price-productcard')
    let pricesValues = [];
    prices.forEach((price) => {
      let priceValue = parseFloat(price.getAttribute('value'));
      pricesValues.push(priceValue)
      
    });
    if(pricesValues.length !== 1) {
    let price = ((pricesValues.slice(0, -1)).reduce((prev, curr)=> prev + curr)).toFixed(2)
    this.props.getPriceInTotal(price)
    }
  }

  handleAddToCart = () => {
    let { shoppingDisabled, ...data } = this.state;
    this.props.addToCart(data);
  };

componentDidMount() {
  this.handleNoAtt();
}

  render() {
    return (
      <MainProductCard>
        {this.props.products.map((product) => {
          let {firstName, secondName} = divideTheName(product.name);
          let avability = Boolean(product.inStock);
          return (
            <Fragment>
              <PhotoSection id="photo-section" >
                <ImagesContainer id="miniatures-img-container">
                  {product.gallery.map((img, i) => (
                    <NavLink activeClassName="active-photo" to={`${i}`}>
                      <ImgMiniature src={img} />
                    </NavLink>
                  ))}
                </ImagesContainer>
                <MainImage src={product.gallery[this.props.product]} id="main-img-product-card"/>
                
              </PhotoSection>

              <ProductAttributesContainer>
                <ProductName><label><p style={{fontWeight: "600", fontSize: "30px", marginBottom: "0"}}>{firstName}</p><p style={{fontWeight: "400", fontSize: "30px", margin: "0"}}>{secondName}</p></label></ProductName>
                {product.attributes.map((attribute) => {
                  return (
                    <ProductDataContainer>
                      <ProductAttributeName
                        value={attribute.name}
                        name="attribute-name"
                      >
                        {attribute.name}:
                      </ProductAttributeName>
                      <ProductAttributeValues name="attributes-values-container">
                        {attribute.items.map((item) => (
                          <AttributeValue
                            className="att-value"
                            type="button"
                            onClick={(e) => this.handleAttributePick(e)}
                            value={item.displayValue}
                            name={attribute.name}
                          >
                            {item.displayValue}
                          </AttributeValue>
                        ))}
                      </ProductAttributeValues>
                    </ProductDataContainer>
                  );
                })}
                 {avability === false ? (
                    <Link to={`/${product.category}/`}>
                      <div id="avaibility-card"
                    
                      >
                        OUT OF STOCK
                      </div>
                    </Link>
                  ) : (
                    ""
                  )}
                  <AddToCartButton
                    type="button"
                    id="add-to-cart"
                    onClick={this.handleAddToCart}
                    disabled={this.state.shoppingDisabled}
                    name="add-to-cart"
                  >
                    ADD TO CART
                  </AddToCartButton>
                <PRICE>PRICE:</PRICE>
                {product.prices
                  .filter(
                    (price) => price.currency === this.props.currentCurrency
                  )
                  .map((price) => (
                    <PriceLabel2
                      name="price-productcard"
                    >
                      {this.props.currencySymbol + price.amount.toFixed(2)}
                    </PriceLabel2>
                  ))}
                <div style={{width:'292px', marginTop: '2.5rem'}}><Interweave content={product.description}/></div>
              </ProductAttributesContainer>
              
              
            </Fragment>
          );
        })}
      </MainProductCard>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (order) => dispatch(addToCart(order)),
    getPriceInTotal: (price) => dispatch(getPriceInTotal(price)),
  };
};

const mapStateToProps = (state) => {
  return {
    getSelectedProduct: getSelectedProduct(state),
    products: getProductDetailsData(state),
    cartInfo: getCartData(state),
    currentCurrency: currencyPick(state),
    currencySymbol: currCurrencySymbol(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
