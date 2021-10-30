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
box-sizing: border-box;
  height: 444px;
  width: 386px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 998;
  
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
  margin: 0 0 0 5vw;
  text-transform: capitalize;
  font-size: 42px;
  font-weight: 400;
  font-style: normal;
`;

const ProductList = styled.div`
  margin: 3em 0 0 1vw;
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(3, 386px);
  box-sizing: border-box;
  justify-items: center;
  justify-content: center;
  align-content: center;
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
  font-weight: 600;
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
        <ProductList id="products-list" key={`${Math.random()}`}>
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
                  
                  <ProductCard id="product-card" value={product.name} key={`${Math.random()}`}>
                  {avability === false ? (
                    <div
                      value={product.name}
                      key={`${Math.random()}`}
                      style={{
                        position: "absolute",
                        lineHeight: "20rem",
                        marginBottom: '10rem',
                        textAlign: "center",
                        color: "black",
                        backgroundColor: "rgba(255, 255, 255)",
                        opacity: "0.5",
                        width: "320px",
                        height: "300px",
                        zIndex: "998",
                        cursor: "default",
                      }}
                    >
                      OUT OF STOCK
                    </div>
                  ) : (
                    ""
                  )}
                    <img
                      key={`${Math.random()}`}
                      value={product.name}
                      style={{ width: "auto", height: "55%", marginTop: "10.38px"}}
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
                    <div style={{display: 'flex', flexDirection: 'column', alignSelf: 'flex-start', marginLeft: '0.5rem'}}>
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
                      ))} </div>
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
