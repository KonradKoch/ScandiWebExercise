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
import { AddToCartButton, AttributeValue, FirstName, ImagesContainer, ImgMiniature, InterweaveDiscriptionContainer, MainImage, MainProductCard, PhotoSection, PRICE, PriceLabel2, ProductAttributeName, ProductAttributesContainer, ProductAttributeValues, ProductDataContainer, ProductName, SecondName } from "./ProductCardStyledComponents";



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

  changeBuyButtonColor = () => {
    const button = document.getElementsByName("add-to-cart");
    button.forEach(({ style }) => {
      style.color = "white";
      style.backgroundColor = "#5ECE7B";
      style.cursor = "pointer";
    });
  };

  handleAttributePick = async (e) => {
    let AttributesNumber = document.getElementsByName("attribute-name").length;
    let pickedAttributeValue = e.target.getAttribute("value");
    let pickedAttributeName = e.target.getAttribute("name");
    let allAttributes = document.getElementsByName(pickedAttributeName);
    let numberOfClickedAtts = (obj) =>
      Object.entries(obj).map(([key]) => key).length - 4;

    const attributes = [];

    allAttributes.forEach((attribute) => {
      attributes.push(attribute.getAttribute("value"));
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

    if (numberOfClickedAtts(this.state) === AttributesNumber) {
      this.setState({
        ...this.state,

        shoppingDisabled: false,
      });

      this.changeBuyButtonColor();
    }
  };

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
      this.setState({
        ...this.state,
        shoppingDisabled: !this.state.shoppingDisabled,
      });
      this.changeBuyButtonColor();
    } else {
      const firstValues = [];
      const valuesContainer = document.getElementsByName(
        "attributes-values-container"
      );
      valuesContainer.forEach((value) => {
        firstValues.push(value.firstChild);
      });

      for (let i = 0; i < valuesContainer.length; i++) {
        setTimeout(() => {
          firstValues[i].click();
        }, 50);
      }
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
          let { firstName, secondName } = divideTheName(product.name);
          let avability = Boolean(product.inStock);
          return (
            <Fragment>
              <PhotoSection id="photo-section">
                <ImagesContainer id="miniatures-img-container">
                  {product.gallery.map((img, i) => (
                    <NavLink activeClassName="active-photo" to={`${i}`}>
                      <ImgMiniature src={img} />
                    </NavLink>
                  ))}
                </ImagesContainer>
                <MainImage
                  alt="Sorry, something went wrong..."
                  src={product.gallery[this.props.product]}
                  id="main-img-product-card"
                />
              </PhotoSection>

              <ProductAttributesContainer>
                <ProductName>
                  <label>
                    <FirstName>{firstName}</FirstName>
                    <SecondName>{secondName}</SecondName>
                  </label>
                </ProductName>
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
                    <div id="avaibility-card">OUT OF STOCK</div>
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
                    <PriceLabel2 name="price-productcard">
                      {this.props.currencySymbol + price.amount.toFixed(2)}
                    </PriceLabel2>
                  ))}
                <InterweaveDiscriptionContainer>
                  <Interweave content={product.description} />
                </InterweaveDiscriptionContainer>
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
