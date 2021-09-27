import gql from "graphql-tag";
import { Component } from "react";
import { connect } from "react-redux";
import { getPricesData, getProductDetails, getProducts } from "../redux/actions/actions";
import { categoryPick } from "../redux/selectors/CategorySelector";
import { currCurrencySymbol, currencyPick, currentPrice } from "../redux/selectors/CurrenciesSelector";
import { getProductsSelector } from "../redux/selectors/ProductsSelector";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { getCartData } from "../redux/selectors/CartSelectors";


const ProductCard = styled.div `
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: center;
padding: 16px;
flex: none;
order: 0;
flex-grow: 0;
margin: 0px 0px;
&:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19)
}    
`

const CurrentCategory = styled.div `
padding: 2em 0 0 0;
margin: 0 0 0 2em;
font-size: 42px;
font-weight: 400;
font-style: normal;

`

const ProductList = styled.div `
margin: 3em 0 0 0;
display: flex;
  grid-gap: 20px;
  flex-wrap: wrap;
  justify-items: center;
  justify-content: center;
`

const ProductNameLabel = styled.label `
width: 100%;

font-style: normal;
font-weight: 300;
font-size: 18px;
line-height: 160%;
text-align: left;
padding: 1em 0 0 0;
`
const PriceLabel = styled.label `
width: 100%;
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 160%;
text-align: left;
`

class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            firstIMGS: [],
            names: []
        }
    }

    getAllProducts(){
        this.props.client.query({
            query: gql `
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
            `
        }).then(result=> {
            let products = result.data.category.products;
            this.setState({
                products: products
            });
            this.props.getProducts(products);
            // this.getListData();
        });
    }

    handleProductCard(details) {
        let value = details.target.getAttribute('value');
        this.props.getProductDetails(value)
    }

    // getListData () {
    //     let frontIMGS = [];
    //     let p_names = [];
    //     for(let i=0; i<this.state.products.length; i++) {
    //         frontIMGS.push(this.state.products[i].gallery[0]);
    //         p_names.push(this.state.products[i].name)
    //     } 
    //     this.setState({
    //         ...this.state,
    //         firstIMGS: frontIMGS,
    //         names: p_names
    //     });
    // }

    componentDidMount() {
        this.getAllProducts();
      
    }

    componentDidUpdate() {
   
    }

    render() {
       return (
           <>
       <CurrentCategory>{this.props.pickedCategory}</CurrentCategory>
       <ProductList>
            {this.props.products.map((product, i)=> {
                
                return (
                    <NavLink className="ProductCard-Nav" onClick={(details)=>this.handleProductCard(details)} value={product.name} to={`/${product.category}/${product.name}/0`}>
                    <ProductCard value={product.name}>
                
                <img value={product.name} style={{width:'304px', height: '280px'}} key={i} src={product.gallery[0]} alt="This photo is currently unavaible."/>
                <ProductNameLabel value={product.name} key={i}>{product.name}</ProductNameLabel>
                    {product.prices.filter(price => 
                        price.currency === this.props.currentCurrency).map((price) =>
                         <PriceLabel value={product.name}>{this.props.currencySymbol + price.amount.toFixed(2)}</PriceLabel>)}
                    </ProductCard>
                    </NavLink>
                )
            })}
            </ProductList>
       
       
            </>
       )
    }
}

const mapStateToProps = state => {
    return {
        products: getProductsSelector(state),
        pickedCategory: categoryPick(state),
        cartInfo: getCartData(state),
        currentCurrency: currencyPick(state),
        currencySymbol: currCurrencySymbol(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
    getProducts: (products) => dispatch(getProducts(products)),
    getProductDetails: (details) => dispatch(getProductDetails(details))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Products);