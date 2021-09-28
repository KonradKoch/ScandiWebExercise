import { Component } from "react";
import styled from "styled-components";
import { addToCart, getProductDetails } from "../redux/actions/actions";
import { connect } from "react-redux";
import { getProductDetailsData, getSelectedProduct } from "../redux/selectors/ProductsSelector";
import { NavLink } from "react-router-dom";
import { currCurrencySymbol, currencyPick } from "../redux/selectors/CurrenciesSelector";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import { getCartData } from "../redux/selectors/CartSelectors";


const MainProductCard = styled.div 
    `
    padding: 5em 0 0 3%;
    display: flex;
    flex-wrap: wrap;
    grid-gap: 10px;
    margin-bottom: 10rem;  
      
      
    `
const PhotoSection = styled.div `
    display: flex;
    grid-gap: 10px;
`

const ImagesContainer = styled.div
    `
    display: flex;
    flex-direction: column;
    grid-gap: 7px;
   
    `

const MainImage = styled.img `
    width: 17rem;
    height: 23rem;
`
const ImgMiniature = styled.img `
width: 3.5em;
height: 4em;
`

const ProductDataContainer = styled.div `
    flex-wrap: wrap;
    margin: 2rem 0 2rem 0;
`

const ProductName = styled.p `
    font-weight: 600;
`

const ProductAttributeName = styled.p `
width: 38px;
height: content-fit;
text-transform: uppercase;

font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 18px;
`
const ProductAttributeValues = styled.div `
display: flex;
flex-wrap: wrap;
flex-direction: row;

`

const ProductAttributesContainer = styled.div `
    width: 34rem;
`

const AttributeValue = styled.label `
cursor: pointer;
border: 1px solid black;
padding: 0.5rem 1rem 0.5rem 1rem;
margin: 0.3rem 0.5rem 0 0;
`

const PRICE = styled.p `
    margin: 3rem 0 1rem 0;
    width: 38px;
height: 18px;
text-transform: uppercase;

font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 18px;
`

const PriceLabel2 = styled.label `
    padding: 0;
    margin: 0;
    width: 100%;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
    text-align: left;
    `

const AddToCartButton = styled.button `
display: flex;
justify-content: center;
align-items: center;
padding: 16px 32px;
align-self: center;

width: 11em;
height: 52px;
left: 929px;
top: 478px;

background: lighgrey;
font-family: Raleway;
font-style: normal;
font-weight: 600;
font-size: 16px;
color: grey;

`


class ProductCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.getSelectedProduct,
            avaibleAttValues: {},
            price: "",
            imgs: this.props.products.map(product => product.gallery),
            
            shoppingDisabled: true
        }
        
        
        
    }
    
    

   

    componentDidMount(){
        this.handleNoAtt();
        
    }

   
    
    async handleAttributePick(e) {
       
        let objectAsArray =  obj => Object.keys(this.state).map(key => [(key), obj[key]])
        let AttributesNumber = document.getElementsByName('attribute-name').length;
        let button = document.getElementsByName('add-to-cart');
        let pickedAttributeValue = e.target.getAttribute('value');
        let pickedAttributeName = e.target.getAttribute('name');
        let allAttributes = document.getElementsByName(pickedAttributeName);
        const attributes = [];
         
      
        for(let i=0; i<allAttributes.length; i++) {
            attributes.push(allAttributes[i].getAttribute('value'));
        }
        
        
        allAttributes.forEach((attribute) => {
            attribute.style.backgroundColor = "white";
            attribute.style.color = "black";
            
            });

         if(pickedAttributeName) {
            e.target.style.backgroundColor = 'black';
            e.target.style.color = 'white';
               
              
            await this.setState({ 
                ...this.state,
                [pickedAttributeName.toLowerCase()]: pickedAttributeValue,
                avaibleAttValues: {...this.state.avaibleAttValues,
                        [pickedAttributeName.toLowerCase()]: attributes,
                    },
                    
                }) 
            
            }
            
        
       
        if(Number(objectAsArray(this.state).length)-5 === Number(AttributesNumber)) {
            
            
            this.setState({
                ...this.state,
             
                shoppingDisabled: false
            })
            button.forEach(button => {
                button.style.color = "white"
                button.style.backgroundColor = "#5ECE7B"
                button.style.cursor = "pointer"
            })
            
        } 
        
        
    
    }

    handleNoAtt(){
       
        const AttributesNumber = document.getElementsByName('attribute-name').length;
        const attributesNames = [];
        for(let i=0; i<AttributesNumber; i++) {
            attributesNames.push(document.getElementsByName('attribute-name')[i].attributes[0].value  )
        }
        if(attributesNames.length === 0){
      
        let button = document.getElementsByName('add-to-cart');
        
        this.setState({
            ...this.state,
            shoppingDisabled: !this.state.shoppingDisabled,
            
        })
        button.forEach(button => {
            button.style.color = "white"
                button.style.backgroundColor = "#5ECE7B"
                button.style.cursor = "pointer"
        })
        console.log(attributesNames)}
    }

    handleAddToCart = async () => {
        let productPrice = document.getElementsByName("price")[0].attributes[0].nodeValue
        await this.setState({
            ...this.state,
            price: productPrice,
          
        })
        
     
       let {shoppingDisabled, ...data} = this.state;
        this.props.addToCart(data)
      
    
       
        
    }
    
   
    

    render() {

        
        return(
        
       <MainProductCard> 
    
           {this.props.products.map((product) => {
           return (
               
           <>
            <PhotoSection>
                <ImagesContainer>
                    {product.gallery.map((img, i) =>
                         <NavLink activeClassName="active-photo" to={`${i}`}><ImgMiniature src={img}/></NavLink>)}
                </ImagesContainer>
                <MainImage src={product.gallery[this.props.product]}/>
            </PhotoSection>
            
            <ProductAttributesContainer>
                <ProductName>{product.name}</ProductName>
                {product.attributes.map((attribute) => {
               return (
                
           <ProductDataContainer>
               
               <ProductAttributeName value={attribute.name} name="attribute-name">{attribute.name}:</ProductAttributeName>
                <ProductAttributeValues>{attribute.items.map((item) => <AttributeValue className="att-value" type="button" onClick={(e)=>this.handleAttributePick(e)} value={item.displayValue} name={attribute.name}>{item.displayValue}</AttributeValue>)}</ProductAttributeValues>
            </ProductDataContainer>
                
            )
                }
           )}
           <PRICE>PRICE:</PRICE>
           {product.prices.filter(price => 
                        price.currency === this.props.currentCurrency).map((price) =>
                         <PriceLabel2 value={product.prices.filter(prices => prices.currency === 'USD').map((price)=> '$' + price.amount)} name="price">{this.props.currencySymbol + price.amount.toFixed(2)}</PriceLabel2>)}
           <div dangerouslySetInnerHTML={{__html: `${product.description}`}} />
           <div style={{position: 'absolute', left: "30%"}}><AddToCartButton type="button" onClick={this.handleAddToCart} disabled={this.state.shoppingDisabled} name="add-to-cart">ADD TO CART</AddToCartButton></div>
            </ProductAttributesContainer>
           </>
           )}
          
            )}
            
          
            </MainProductCard>
            
        )
    }
}




const mapDispatchToProps = dispatch => {
    return {
    addToCart: (order) => dispatch(addToCart(order))
    }
}

const mapStateToProps = (state) => {
    return {
        getSelectedProduct: getSelectedProduct(state),
        products: getProductDetailsData(state),
        cartInfo: getCartData(state),
        currentCurrency: currencyPick(state),
        currencySymbol: currCurrencySymbol(state) 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductCard); 