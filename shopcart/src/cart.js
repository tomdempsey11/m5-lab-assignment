// src/cart.js
import React from "react";
import { Container, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Cart = ({ products, totalQty }) => {
  const navigate = useNavigate();

  const cartItems = products.filter((p) => p.value > 0);

  const itemCount =
    typeof totalQty === "number"
      ? totalQty
      : cartItems.reduce((sum, p) => sum + p.value, 0);

  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleCheckout = () => {
    navigate("/signin");
  };

  return (
    <Container className="cart-screen">
      <h2 className="cart-title">Your Cart Items</h2>

      {cartItems.length === 0 ? (
        <>
          <p>You have {itemCount} item(s) in your cart.</p>
          <Button color="primary" onClick={handleContinueShopping}>
            Continue Shop
          </Button>
        </>
      ) : (
        <>
          {/* --- Bordered card around cart items like the demo --- */}
          <div
            style={{
              border: "1px solid #e0e0e0",
              padding: "20px",
              borderRadius: "4px",
              maxWidth: "750px",
              marginBottom: "20px",
            }}
          >
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
          </div>

          {/* --- Blue “Check Out” button under the box --- */}
          <Button color="primary" onClick={handleCheckout}>
            Check Out
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
