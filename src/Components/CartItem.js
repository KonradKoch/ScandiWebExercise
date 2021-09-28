import { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { vectorleft, vectorright, vectordec, vectorinc, vectortrash } from "../assets/Vector";
import { addToCart, removeFromCart } from "../redux/actions/actions";






const CartItemMain = styled.div`
    
    display: flex;
    flex-wrap: wrap;
    
    `

const CartItemData = styled.div`
    width:80%;
    
    border-top: 2px solid #E5E5E5;
    

`
const CartItemValues = styled.div `
    width: 100%;
    display-direction: column;
`
const AttributeValue = styled.label `

display: flex;
height: 100%;
flex-wrap: no-wrap;
grid-gap: 4px;


`
const AttributeValue2 = styled.label `
display: flex;
flex-wrap: wrap;
border: 1px solid black;
padding: 0.25rem 0.5rem 0.25rem 0.5rem;

`
const AttributeValue3 = styled.label `

display: flex;
flex-wrap: wrap;
color: white;
background-color: black;
border: 1px solid black;
padding: 0.25rem 0.5rem 0.25rem 0.5rem;

`

const AttributeName = styled.p `
margin: 0.5rem;
`
const QuantityButtons = styled.button `
height: 2.5rem;
width: 2.5rem;
cursor: pointer;
background-color: white;

padding: 0.4rem 0.3rem 0.8rem 0.3rem;
box-sizing: border-box
`
const QuantityValues = styled.label `
font-weight: 500;
font-size: 24px;



`

const QuantityCounter = styled.div `
margin: 1rem;
justify-content: center;
grid-gap: 1rem;
display: flex;
align-items: center;
flex-direction: column;
flex-wrap: nowrap;
`

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avaibleAttValues: Object.values(this.props.attributes.order.avaibleAttValues),
            availbleAttKeys: Object.keys(this.props.attributes.order.avaibleAttValues),
            imgs: this.props.attributes.order.imgs,
            counter: 0,
            refreshItemCart: false
        }
    }
    
    getAttValues(){
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
        if(this.state.counter < this.state.imgs[0].length - 1) {
            this.setState({
               ...this.state,
               counter: this.state.counter + 1
           })
       } else {
           this.setState({
               ...this.state,
               counter: 0
           })
       } 
    }
    increaseAmount = () => {
        return this.props.addToCart(this.props.attributes.order)
    }
    decreaseAmount = () => {
        return this.props.removeFromCart(this.props.attributes)  
    }
    
    

    prevPhoto =  () => {
        if(this.state.counter) {
         this.setState({
            ...this.state,
            counter: this.state.counter - 1
        })
    } else {
        this.setState({
            ...this.state,
            counter: this.state.imgs[0].length -1
        })
    }}
    componentDidMount() {
        console.log(this.state.imgs)
    }
    
    render(){
        return (
            
        <CartItemMain>
            <CartItemData>
                <CartItemValues>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', width: '55%'}}>
                <p >{this.props.attributes.order.name}</p>
                <p >{(this.props.attributes.order.price).slice(0,1) + (Number((this.props.attributes.order.price).slice(1)) * Number(this.props.attributes.quantity)).toFixed(2)}</p>
                </div>
                <QuantityCounter>
                <QuantityButtons onClick={() => this.increaseAmount()}><label style={{position: 'absolute', margin: '0.2rem 0 0 0.5rem'}}>{vectorinc}</label>{vectordec}
                </QuantityButtons>
                <QuantityValues>{this.props.attributes.quantity}
                </QuantityValues>
                <QuantityButtons value={this.props.attributes.quantity} onClick={(e) => this.decreaseAmount(e)}>{this.props.attributes.quantity === 1? vectortrash : vectordec}
                </QuantityButtons>
                </QuantityCounter>
                <div style={{display: 'flex', flexDirection: 'row'}}><label onClick={() => this.prevPhoto()} style={{cursor: 'pointer', position: 'absolute', alignSelf: 'center', marginLeft: '1rem'}}>{vectorleft}</label>
                <img style={{width: "7.5rem", display: 'flex'}} src={this.state.imgs[0][this.state.counter]}/>
                <label onClick={() => this.nextPhoto()} style={{cursor: 'pointer', position: 'absolute', alignSelf: 'center', marginLeft: '5rem'}}>{vectorright}</label></div>
                </div>
                   {this.state.avaibleAttValues.map((value, i) =>{
                   let key = this.state.availbleAttKeys
                   let values = Object.entries(this.props.attributes.order).slice(4)
                   return (
                       <>
                       <AttributeName>{key[i].toUpperCase()} :</AttributeName>
                   <AttributeValue>{value.map(item => {
                       
                       return (
                    values[i].includes(item)?
                   <AttributeValue3 name="att-values" value={item}>{item}</AttributeValue3>: <AttributeValue2 name="att-values" value={item}>{item}</AttributeValue2>
                       )
                }
                   
                   )}
                   </AttributeValue>
                   
                   </>
                   )
                }
                )
                }
                
                </CartItemValues>
            </CartItemData>
            
        </CartItemMain>
        )
    } 
}

const mapDispatchToProps = dispatch => {
    return {
    addToCart: (order) => dispatch(addToCart(order)),
    removeFromCart: (order) => dispatch(removeFromCart(order))
    }
}

export default connect(null, mapDispatchToProps)(CartItem);