import { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { shopping, vector0, vector1 } from "../assets/Vector";
import { connect } from "react-redux";
import { categoryPick } from "../redux/selectors/CategorySelector";
import {
  getCurrency,
  getCurrencySymbol,
  pickCategory,
} from "../redux/actions/actions";
import {
  currCurrencySymbol,
  currencyPick,
} from "../redux/selectors/CurrenciesSelector";
import { Link, NavLink } from "react-router-dom";
import Cart from "./Cart";
import MiniCart from "./MiniCart";
import { getCartData } from "../redux/selectors/CartSelectors";

const MainHeaderDiv = styled.div`
  height: 4em;
  position: fixed;
  background-color: white;
  width: 100%;
  z-index: 999;
`;

const HeaderDiv = styled.div`
  display: flex;
  position: flex;
  flex-wrap: wrap;
  justify-content: left;
  padding-left: 5em;
  height: 4rem;
  width: 100%;
`;

const NavCategoryDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em 0 0 0;
`;

const HeaderUl = styled.label`
  cursor: pointer;
  padding: 0.25em 0.5em 0em 0.5em;
  margin: 0;
`;
const HeaderLi = styled.label`
  cursor: pointer;
  padding: 0 0 0 0;
  text-transform: uppercase;
`;

const DropDownContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 1em;
  right: 3.5em;
  width: 1.5em;
  height: 1.5em;
  margin: 0;
  justify-content: center;
  line-height: 160%;
`;
const DropDownHeader = styled("div")`
  content-align: center;
  justify-content: space-around;
  font-weight: 700;
  padding: 0;
`;

const DropDownListContainer = styled("div")`
  position: flex;
  margin: 0 0 0 -4rem;
`;

const DropDownList = styled("ul")`
  cursor: auto;
  width: 5.5em;
  position: center;
  padding: 0;
  margin: 0.7em;

  background: #ffffff;
  filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  font-weight: 900;
  justify-content: "center";

  &:first-child {
    padding-top: 0.8em;
  }
  :last-child {
    padding-bottom: 0.8em;
  }
`;

const ListItem = styled("li")`
  cursor: pointer;
  list-style: none;
  margin-bottom: 0.8em;
  padding-left: 1rem;
`;
const VectorLabel = styled.label`
  cursor: pointer;
  position: absolute;
  bottom: 0.1rem;
  right: 0.1rem;
`;
const BasketContainer = styled.div`
  align-self: center;
  padding: 0;
  margin: 0;
  position: absolute;
  right: 2rem;
  height: 1.7rem;
  width: 1rem;
`;

const DropDownMiniCartHeader = styled("div")`
  cursor: pointer;
  content-align: center;
  justify-content: space-around;
  font-weight: 700;
  z-index: 999;
  position: absolute;
  padding: 0;
`;
const DropDownMiniCart = styled("ul")`
  cursor: auto;
  z-index: 997;
  overflow-y: auto;
  position: absolute;
  padding: 0;
  top: 2.9rem;
  max-height: 35rem;
  width: 20rem;
  background: #ffffff;

  filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  font-weight: 900;
  justify-content: "center";

  margin: 0 0 0 -18.25rem;
  &:first-child {
    padding-top: 0.8em;
  }
  :last-child {
    padding-bottom: 0.8em;
  }
`;

const ToCartButton = styled.button `
background-color: #ffffff;
margin: 0 0.4rem 0 0;
width: 46%;
height: 2.5rem;
`

const ToCheckOutButton = styled.button `
margin: 0 0 0 0.4rem;
background-color: #5ECE7B;
color: white;
width: 46%;
height: 2.5rem;
`

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currencies: [],
      currenciesMenuIsOpen: false,
      miniCartIsOpen: false,
      symbols: ["$", "£", "$", "¥", "₽"],
    };
  }

  getAllCategories() {
    this.props.client
      .query({
        query: gql`
          query {
            currencies
            category {
              products {
                category
              }
            }
          }
        `,
      })
      .then((result) => {
        let categoryNames = [];
        let currenciesTags = [];
        for (let i = 0; i < result.data.category.products.length; i++) {
          categoryNames.push(result.data.category.products[i]["category"]);
        }
        for (let i = 0; i < result.data.currencies.length; i++) {
          currenciesTags.push(result.data.currencies[i]);
        }

        return this.setState({
          ...this.state,
          categories: [...new Set(categoryNames)],
          currencies: currenciesTags,
        });
      });
  }

  // handleCategoryClick() {
  //     const clickedButton = document.getElementById(`${this.state.pickedCategory}`);
  //     if (clickedButton && clickedButton.getAttribute('value') === this.state.pickedCategory){
  //         clickedButton.style.borderBottom = "5px solid green"

  //     }

  // }

  pickCategory(e) {
    const value = e.target.getAttribute("value");
    let overlay = document.getElementById("overlay");
    this.setState({
      ...this.state,
      pickedCategory: value,
      miniCartIsOpen: false,
    });
    this.props.pickCategory(value);
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
     // zmiana w store przez selector
  }

  togglingCurrencyMenu() {
    let isOpen = this.state.currenciesMenuIsOpen;
    this.setState({
      ...this.state,
      currenciesMenuIsOpen: !isOpen,
    });
  }
  togglingMiniCartMenu() {
    let overlay = document.getElementById("overlay");
    let isOpen = this.state.miniCartIsOpen;
    this.setState({
      ...this.state,
      miniCartIsOpen: !isOpen,
    });
    if (!isOpen) {
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    } else {
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    }
    // isOpen === true? overlay.style.display = "none" : overlay.style.display = "flex"
  }

  changeCurrency(e) {
    const value = e.target.getAttribute("value");
    const id = e.target.getAttribute("id");

    this.props.getCurrency(value);
    this.props.getCurrencySymbol(id);

    this.setState({
      ...this.state,
      currenciesMenuIsOpen: false,
    });
  }

  componentDidMount() {
    this.getAllCategories();
  }

  componentDidUpdate() {}

  render() {
    return (
      <MainHeaderDiv>
        <div id="overlay" />
        <HeaderDiv>
          <NavCategoryDiv>
            {this.state.categories.map((category, i) => {
              return (
                <NavLink
                  id="navbar-category-menu"
                  activeClassName="active"
                  key={category + i}
                  to={`/${category}/`}
                  value={category}
                  onClick={(e) => this.pickCategory(e)}
                >
                  <HeaderUl
                    onClick={(e) => this.pickCategory(e)}
                    key={category}
                    value={category}
                  >
                    <HeaderLi value={category} key={category}>
                      {category}
                    </HeaderLi>
                  </HeaderUl>
                </NavLink>
              );
            })}
          </NavCategoryDiv>

          <DropDownContainer>
            <DropDownHeader onClick={() => this.togglingCurrencyMenu()}>
              {this.props.currencySymbol || "$"}{" "}
              <VectorLabel>
                {this.state.currenciesMenuIsOpen ? vector1 : vector0}
              </VectorLabel>
            </DropDownHeader>
            <DropDownListContainer>
              <DropDownList
                style={{
                  display: !this.state.currenciesMenuIsOpen ? "none" : "",
                }}
              >
                {this.state.currenciesMenuIsOpen &&
                  this.state.currencies.map((currency, i) => {
                    const currSymbol = this.state.symbols[i];
                    return (
                      <ListItem
                        key={currSymbol + " " + currency}
                        onClick={(e) => this.changeCurrency(e)}
                        id={currSymbol}
                        value={currency}
                      >
                        {" "}
                        {currSymbol} {currency}{" "}
                      </ListItem>
                    );
                  })}
              </DropDownList>
            </DropDownListContainer>
          </DropDownContainer>
          <BasketContainer>
            <DropDownMiniCartHeader onClick={() => this.togglingMiniCartMenu()}>
              {shopping}
            </DropDownMiniCartHeader>
                  {this.props.cartInfo.length > 0? <label onClick={() => this.togglingMiniCartMenu()} style={{backgroundColor:'black', color:'white', cursor: 'pointer', borderRadius: 1000, fontWeight: '900', width:'20px', height:'20px', position:'absolute', fontSize:'14px', textAlign: 'center', left: '0.8rem', bottom: '1rem', zIndex: '999'}}>{this.props.cartInfo.length}</label> : ""}
            <DropDownMiniCart
              style={{
                display: !this.state.miniCartIsOpen ? "none" : "",
              }}
            >
              <MiniCart />
              {this.props.cartInfo.length == 1 && this.state.miniCartIsOpen? <div style={{position: 'flex', padding:'0.5rem 0.5rem 0.5rem 0.5rem', right: '2.5rem', top: '20rem', zIndex: '999', width: '17.2rem', height: 'auto', backgroundColor: 'white'}}><Link to="/shop/cart/"><ToCartButton onClick={() => this.togglingMiniCartMenu()}>VIEW CART</ToCartButton></Link><ToCheckOutButton>CHECK OUT</ToCheckOutButton></div>: ""}
            </DropDownMiniCart>
            
            {this.props.cartInfo.length > 1 && this.state.miniCartIsOpen? <div style={{position: 'fixed', padding:'0.5rem 0.5rem 0.5rem 0.5rem', right: '2.5rem', top: '35.5rem', zIndex: '999', width: '17.2rem', height: 'auto', backgroundColor: 'white'}}><Link to="/shop/cart/"><ToCartButton onClick={() => this.togglingMiniCartMenu()}>VIEW CART</ToCartButton></Link><ToCheckOutButton>CHECK OUT</ToCheckOutButton></div>: ""}
          </BasketContainer>
        </HeaderDiv>
      </MainHeaderDiv>
    );
  }
}

function mapStateToProps(state) {
  return {
    pickedCategory: categoryPick(state),
    currentCurrency: currencyPick(state),
    currencySymbol: currCurrencySymbol(state),
    cartInfo: getCartData(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pickCategory: (e) => dispatch(pickCategory(e)),
    getCurrency: (e) => dispatch(getCurrency(e)),
    getCurrencySymbol: (e) => dispatch(getCurrencySymbol(e)),
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
