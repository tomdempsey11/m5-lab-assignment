// src/Cart.js
import React from "react";
import { Container } from "reactstrap";
import "./App.css";

const Cart = ({ products }) => {
  // Only show products with quantity > 0
  const cartItems = products.filter((p) => p.value > 0);

  return (
    <Container className="cart-screen">
      <h2 className="cart-title">Your Cart Items</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((product) => (
          <div key={product.id} className="product-row">
            <div className="product-left">
              <img
                src={product.image}
                alt={product.desc}
                className="product-row__img"
              />
              <p className="product-title">{product.desc}</p>
            </div>

            <div className="product-row__details">
              <p className="cart-qty">
                <strong>Quantity:</strong> {product.value}
              </p>
            </div>
          </div>
        ))
      )}
    </Container>
  );
};

export default Cart;
