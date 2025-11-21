// src/App.js
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import productsData from "./products";
import Navbar from "./navbar";
import DisplayProducts from "./displayProducts";
import Cart from "./cart";
import SignIn from "./SignIn";
import Checkout from "./Checkout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: productsData,
      sortOption: "Normal", // NEW
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

  // 🔽 sort handler
  handleSortChange = (option) => {
    const products = [...this.state.products];

    if (option === "Normal") {
      // default by id ascending
      products.sort((a, b) => a.id - b.id);
    } else if (option === "Lowest") {
      // price low → high
      products.sort((a, b) => a.price - b.price);
    } else if (option === "Highest") {
      // price high → low
      products.sort((a, b) => b.price - a.price);
    }

    this.setState({ products, sortOption: option });
  };

  render() {
    const totalQty = this.getTotalQuantity();

    return (
      <Router>
        <Navbar totalQty={totalQty} />

        <Routes>
          {/* home = show products */}
          <Route
            path="/"
            element={
              <DisplayProducts
                products={this.state.products}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
                sortOption={this.state.sortOption}          // NEW
                onSortChange={this.handleSortChange}        // NEW
              />
            }
          />

          {/* cart page */}
          <Route
            path="/cart"
            element={<Cart products={this.state.products} totalQty={totalQty} />}
          />

          {/* sign in page */}
          <Route path="/signin" element={<SignIn />} />

          {/* check out page */}
          <Route
            path="/checkout"
            element={<Checkout products={this.state.products} totalQty={totalQty} />}
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
