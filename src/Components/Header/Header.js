import { PureComponent } from "react";
// import styled from "styled-components";
import gql from "graphql-tag";
import {
  backgroundlogo1,
  shopping,
  vector0,
  vector1,
} from "../../assets/Vector";
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
import { catNamesAndCurrencyQuery } from "../../utilities/gqlQueries";
import { BasketContainer, CartCounterLabel, CartCounterValue, DropDownContainer, DropDownList, DropDownListContainer, DropDownMiniCart, DropDownMiniCartHeader, HeaderDiv, HeaderLi, HeaderUl, ListItem, MainHeaderDiv, NavCategoryDiv, ToCartButton, ToCheckOutButton, TotalLabel, TotalPriceContainer, TotalPriceLabel, TotalPriceLabelContainer, VectorLabel } from "./HeaderStyledComponents";



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
          ${catNamesAndCurrencyQuery}
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
      if (this.props.cartInfo.length > 0) {
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
          <div className="navbar-logo">{backgroundlogo1}</div>
          <DropDownContainer onClick={() => this.togglingCurrencyMenu()}>
            <DropDownMiniCartHeader onClick={() => this.togglingCurrencyMenu()}>
              {this.props.currencySymbol || "$"}
              <VectorLabel >
                {this.state.currenciesMenuIsOpen ? vector1 : vector0}
              </VectorLabel>
            </DropDownMiniCartHeader>
            <DropDownListContainer>
              <DropDownList
                id="drop-down-minicart"
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
                        
                        {currSymbol} {currency}
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
              <CartCounterLabel onClick={() => this.togglingMiniCartMenu()}>
                <CartCounterValue>{this.props.cartInfo.length}</CartCounterValue>
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

            {this.props.cartInfo.length >= 1 && this.state.miniCartIsOpen ? (
              <TotalPriceContainer
                id="total-price-container"
                
              >
                <TotalPriceLabelContainer>
                  <TotalLabel
                  >
                    Total:
                  </TotalLabel>
                  <TotalPriceLabel>
                    {this.props.currencySymbol + this.props.totalPrice}
                  </TotalPriceLabel>
                </TotalPriceLabelContainer>
                <Link to="/shop/cart/">
                  <ToCartButton onClick={() => this.togglingMiniCartMenu()}>
                    VIEW CART
                  </ToCartButton>
                </Link>
                <ToCheckOutButton>CHECK OUT</ToCheckOutButton>
              </TotalPriceContainer>
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
