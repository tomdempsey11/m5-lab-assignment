import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// these will be separate files we create:
import productsData from "./products";
import Navbar from "./navbar";
import DisplayProducts from "./displayProducts";
import Cart from "./cart";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // load the products from separate file
      products: productsData,
    };
  }

  // total items in cart
  getTotalQuantity = () => {
    return this.state.products.reduce((total, p) => total + p.value, 0);
  };

  // increment handler
  handleIncrement = (product) => {
    const products = this.state.products.map((p) =>
      p.id === product.id ? { ...p, value: p.value + 1 } : p
    );
    this.setState({ products });
  };

  // decrement handler
  handleDecrement = (product) => {
    const products = this.state.products.map((p) =>
      p.id === product.id ? { ...p, value: Math.max(p.value - 1, 0) } : p
    );
    this.setState({ products });
  };

  render() {
    const totalQty = this.getTotalQuantity();

    return (
      <Router>
        {/* navbar always shows */}
        <Navbar totalQty={totalQty} />

        {/* main routes */}
        <Routes>
          {/* home = show products */}
          <Route
            path="/"
            element={
              <DisplayProducts
                products={this.state.products}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
              />
            }
          />

          {/* cart page */}
          <Route
            path="/cart"
            element={
              <Cart
                products={this.state.products.filter((p) => p.value > 0)}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
              />
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
