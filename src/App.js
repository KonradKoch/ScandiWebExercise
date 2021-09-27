import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import Header from "./Components/Header";
import { getCurrency, getProducts, pickCategory, getCurrencySymbol, getProductDetails, addToCart } from "./redux/actions/actions";
import Products from "./Components/Products";
import ProductCard from "./Components/ProductCard";
import Cart from "./Components/Cart";
import { getCartData } from "./redux/selectors/CartSelectors";
// const store = createStore( null, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const client = new ApolloClient({
  uri: "http://localhost:4000/"
});


class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <Router>
      <ApolloProvider client={client}>
        <>
        <Header pickCategory={pickCategory} client={client}/>
        <Route exact path="/"/>
        <Redirect to="/clothes/"/>
        <Route exact path="/:category/">  
        <Products getProductDetails={getProductDetails} getCurrency={getCurrency} getCurrencySymbol={getCurrencySymbol} getProducts={getProducts} client={client}/>
        </Route>
        <Route exact path="/:category/:product/:id" render={(props)=>(<ProductCard getCartData={getCartData} addToCart={addToCart} product={props.match.params.id}/>)}/>
        <Route exact path="/shop/cart/"><Cart getCartData={getCartData}/></Route>
        </>

      </ApolloProvider>
      </Router>
    )
  }
}

export default App;

