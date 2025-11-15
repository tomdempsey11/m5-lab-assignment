// src/Checkout.js
import React from "react";
import { Container } from "reactstrap";
import "./App.css";

const Checkout = ({ products, totalQty }) => {
  const cartItems = products.filter((p) => p.value > 0);

  const itemCount =
    typeof totalQty === "number"
      ? totalQty
      : cartItems.reduce((sum, p) => sum + p.value, 0);

  // Optional: total price if your products have a price field
  const totalPrice = cartItems.reduce(
    (sum, p) => sum + (p.price || 0) * p.value,
    0
  );

  return (
    <Container className="cart-screen">
      <h2 className="cart-title">Check Out</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add items before checking out.</p>
      ) : (
        <>
          {/* Welcome-style card like the example */}
          <div
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ color: "green" }}>Welcome Back!</h3>
            <p>Time to check out?</p>
          </div>

          {/* Cart items */}
          {cartItems.map((product) => (
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
          ))}

          {/* Summary */}
          <div className="checkout-summary">
            <p>
              <strong>Total items:</strong> {itemCount}
            </p>
            {totalPrice > 0 && (
              <p>
                <strong>Total price:</strong> ${totalPrice.toFixed(2)}
              </p>
            )}
            <p>Thank you for shopping with us!</p>
          </div>
        </>
      )}
    </Container>
  );
};

export default Checkout;
