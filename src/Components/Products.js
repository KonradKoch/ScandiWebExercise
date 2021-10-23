import gql from "graphql-tag";
import { Component } from "react";
import { connect } from "react-redux";
import { getProductDetails, getProducts } from "../redux/actions/actions";
import { categoryPick } from "../redux/selectors/CategorySelector";
import {
  currCurrencySymbol,
  currencyPick,
} from "../redux/selectors/CurrenciesSelector";
import { getProductsSelector } from "../redux/selectors/ProductsSelector";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { getCartData } from "../redux/selectors/CartSelectors";

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  z-index: 998;
  padding: 16px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
  &:hover .product-list-shopping-button {
    display: block;
  }
`;

const CurrentCategory = styled.div`
  padding: 2em 0 0 0;
  margin: 0 0 0 2em;
  font-size: 42px;
  font-weight: 400;
  font-style: normal;
`;

const ProductList = styled.div`
  margin: 3em 0 0 0;
  display: flex;
  grid-gap: 20px;
  flex-wrap: wrap;
  justify-items: center;
  justify-content: center;
`;

const ProductNameLabel = styled.label`
  width: 100%;

  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 160%;
  text-align: left;
  padding: 1em 0 0 0;
`;
const PriceLabel = styled.label`
  width: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  text-align: left;
`;

class Products extends Component {
  

  getAllProducts() {
    this.props.client
      .query({
        query: gql`
          query {
            category {
              products {
                inStock
                description
                attributes {
                  name
                  id
                  items {
                    displayValue
                  }
                }
                category
                name
                gallery
                prices {
                  amount
                  currency
                }
              }
            }
          }
        `,
      })
      .then((result) => {
        let products = result.data.category.products;
        this.props.getProducts(products);
      });
  }

  handleProductCard(details) {
    let value = details.target.getAttribute("value");
    this.props.getProductDetails(value);
  }

  componentDidMount() {
    this.getAllProducts();
  }

  render() {
    return (
      <div key={Math.random()}>
        <CurrentCategory key={Math.random()}>
          {this.props.pickedCategory}
        </CurrentCategory>
        <ProductList key={`${Math.random()}`}>
          {this.props.products.map((product, i) => {
            let avability = Boolean(product.inStock);
            return (
              <div key={Math.random()}>
                <NavLink
                  key={`${Math.random()}`}
                  className="ProductCard-Nav"
                  onClick={(details) => this.handleProductCard(details)}
                  value={product.name}
                  to={`/${product.category}/${product.name}/0`}
                >
                  {avability === false ? (
                    <div
                      value={product.name}
                      key={`${Math.random()}`}
                      style={{
                        position: "absolute",
                        lineHeight: "20rem",
                        textAlign: "center",
                        color: "black",
                        backgroundColor: "rgba(255, 255, 255)",
                        opacity: "0.5",
                        width: "330px",
                        height: "320px",
                        zIndex: "998",
                        cursor: "default",
                      }}
                    >
                      OUT OF STOCK
                    </div>
                  ) : (
                    ""
                  )}
                  <ProductCard value={product.name} key={`${Math.random()}`}>
                    <img
                      key={`${Math.random()}`}
                      value={product.name}
                      style={{ width: "304px", height: "280px" }}
                      src={product.gallery[0]}
                      alt="Product"
                    />
                    <div key={`${Math.random()}`}>
                      <img
                        key={`${Math.random()}`}
                        value={product.name}
                        onClick={(details) => this.handleProductCard(details)}
                        className="product-list-shopping-button"
                        src={require("../assets/Common.svg").default}
                        alt="BUY"
                      />
                    </div>
                    <ProductNameLabel
                      value={product.name}
                      key={`${Math.random()}`}
                    >
                      {product.name}
                    </ProductNameLabel>
                    {product.prices
                      .filter(
                        (price) => price.currency === this.props.currentCurrency
                      )
                      .map((price) => (
                        <PriceLabel
                          value={product.name}
                          key={`${Math.random()}`}
                        >
                          {this.props.currencySymbol + price.amount.toFixed(2)}
                        </PriceLabel>
                      ))}
                  </ProductCard>
                </NavLink>
              </div>
            );
          })}
        </ProductList>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: getProductsSelector(state),
    pickedCategory: categoryPick(state),
    cartInfo: getCartData(state),
    currentCurrency: currencyPick(state),
    currencySymbol: currCurrencySymbol(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (products) => dispatch(getProducts(products)),
    getProductDetails: (details) => dispatch(getProductDetails(details)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
