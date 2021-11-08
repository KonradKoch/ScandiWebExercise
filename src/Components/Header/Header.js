import { PureComponent } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { backgroundlogo1, shopping, vector0, vector1 } from "../../assets/Vector";
import { connect } from "react-redux";
import { categoryPick } from "../../redux/selectors/CategorySelector";
import {
  getCurrency,
  getCurrencySymbol,
  getPriceInTotal,
  pickCategory,
} from "../../redux/actions/actions";
import {
  currCurrencySymbol,
  currencyPick,
} from "../../redux/selectors/CurrenciesSelector";
import { Link, NavLink } from "react-router-dom";
import MiniCart from "../MiniCart/MiniCart";
import { getCartData, priceInTotal } from "../../redux/selectors/CartSelectors";

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
  margin-left: 5vw;
  height: 4rem;
  width: 100%;
`;

const NavCategoryDiv = styled.div`
  display: flex;
  z-index: 999;
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
  height: 35rem;
  
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

const ToCartButton = styled.button`
  background-color: #ffffff;
  margin: 0 0.4rem 0 0;
  width: 46%;
  height: 2.5rem;
`;

const ToCheckOutButton = styled.button`
  margin: 0 0 0 0.4rem;
  background-color: #5ece7b;
  color: white;
  width: 46%;
  height: 2.5rem;
`;

const CartCounterLabel = styled.label `
  background-color: black;
  color: white;
  cursor: pointer;
  border-radius: 1000rem;
  font-weight: 900;
  width: 20px;
  height: 20px;
  position: absolute;
  font-size: 14px;
  text-align: center;
  left: 0.8rem;
  bottom: 1rem;
  z-index: 999;
        `

class Header extends PureComponent {
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
 
    if (!isOpen) {
      if(this.props.cartInfo.length > 0) {
      this.setState({
      ...this.state,
      miniCartIsOpen: !isOpen,
    });
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
      }
    } else {
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
      this.setState({
        ...this.state,
        miniCartIsOpen: !isOpen,
      });
    }
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

  render() {
    return (
      <MainHeaderDiv>
        <div id="overlay" onClick={() => this.togglingMiniCartMenu()} />
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
          <div className="navbar-logo">
            <div>{backgroundlogo1}</div>
          </div>
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
            {this.props.cartInfo.length > 0 ? (
              <CartCounterLabel
                onClick={() => this.togglingMiniCartMenu()}
                
              >
                {this.props.cartInfo.length}
              </CartCounterLabel>
            ) : (
              ""
            )}
            <DropDownMiniCart
              id="minicart-main"
              style={{
                display: !this.state.miniCartIsOpen ? "none" : "",
              }}
            >
              <MiniCart priceInTotal={priceInTotal} />
              
            </DropDownMiniCart>
            {/* {this.props.cartInfo.length === 1 && this.state.miniCartIsOpen ? (
                <div id="minicart-totalprice-container"
                  style={{
                    position: "fixed",
                  top: '30.5em',
                  paddingBottom: "0.25rem",
                     
                    right: "1.25rem",
                     
                   
                 
            
                  textAlign: "center",
                  zIndex: "997",
                  width: "20rem",
                  height: "6rem",
                  backgroundColor: "white",
                  fontWeight: "900",
                  }}
                >
                  <div style={{ height: "4rem", textAlign: "center"}}>
                    <label style={{ width: "auto", margin: "0 7rem 0 0", fontFamily: "Roboto", fontWeight: "500", size: "16px" }}>
                      Total:
                    </label>
                    <label style={{ width: "3rem" }}>
                      {this.props.currencySymbol + this.props.totalPrice}
                    </label>
                  </div>
                  <Link to="/shop/cart/">
                    <ToCartButton onClick={() => this.togglingMiniCartMenu()}>
                      VIEW CART
                    </ToCartButton>
                  </Link>
                  <ToCheckOutButton>CHECK OUT</ToCheckOutButton>
                </div>
              ) : (
                ""
              )} */}
            {this.props.cartInfo.length >= 1 && this.state.miniCartIsOpen ? (
              <div
                id="total-price-container"
                style={{
                  position: "fixed",
                  top: '33.5em',
                  paddingBottom: "0.25rem",
                      right: '3.5em',
           
                      width: '18.5rem',
                   
                 
            
                  textAlign: "center",
                  zIndex: "997",
                  width: "17.2rem",
                  height: "5rem",
                  backgroundColor: "white",
                  fontWeight: "900",
                }}
              >
                <div style={{ height: "2.5rem" }}>
                  <label style={{ width: "auto", margin: "0 7rem 0 0", fontFamily: "Roboto", fontWeight: "500", size: "16px" }}>
                    Total:
                  </label>
                  <label style={{ width: "3rem" }}>
                    {this.props.currencySymbol + this.props.totalPrice}
                  </label>
                </div>
                <Link to="/shop/cart/">
                  <ToCartButton onClick={() => this.togglingMiniCartMenu()}>
                    VIEW CART
                  </ToCartButton>
                </Link>
                <ToCheckOutButton>CHECK OUT</ToCheckOutButton>
              </div>
            ) : (
              ""
            )}
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
    totalPrice: priceInTotal(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pickCategory: (e) => dispatch(pickCategory(e)),
    getCurrency: (e) => dispatch(getCurrency(e)),
    getCurrencySymbol: (e) => dispatch(getCurrencySymbol(e)),
    getPriceInTotal: (e) => dispatch(getPriceInTotal(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);