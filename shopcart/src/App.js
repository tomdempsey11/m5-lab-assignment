import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 1,
          image: process.env.PUBLIC_URL + "/products/cologne.jpg",
          desc: "Unisex Cologne",
          value: 0,
        },
        {
          id: 2,
          image: process.env.PUBLIC_URL + "/products/iwatch.jpg",
          desc: "Apple iWatch",
          value: 0,
        },
        {
          id: 3,
          image: process.env.PUBLIC_URL + "/products/mug.jpg",
          desc: "Unique Mug",
          value: 0,
        },
        {
          id: 4,
          image: process.env.PUBLIC_URL + "/products/wallet.jpg",
          desc: "Mens Wallet",
          value: 0,
        },
      ],
    };
  }

  // total items in cart
  getTotalQuantity = () => {
    return this.state.products.reduce((total, p) => total + p.value, 0);
  };

  handleIncrement = (product) => {
    const products = this.state.products.map((p) =>
      p.id === product.id ? { ...p, value: p.value + 1 } : p
    );
    this.setState({ products });
  };

  handleDecrement = (product) => {
    const products = this.state.products.map((p) =>
      p.id === product.id ? { ...p, value: Math.max(p.value - 1, 0) } : p
    );
    this.setState({ products });
  };

  render() {
    const totalQty = this.getTotalQuantity();

    return (
      <div>
        {/* TOP BAR */}
        <nav className="topbar">
          <h4 className="topbar__title">Shop to React</h4>
          <div className="topbar__cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>
              {totalQty} {totalQty === 1 ? "item" : "items"}
            </span>
          </div>
        </nav>

        {/* PRODUCT LIST */}
        <Container className="p-0">
          {this.state.products.map((product) => (
            <div key={product.id} className="product-row">
              {/* left: name ABOVE image */}
              <div className="product-left">
                <h5 className="product-title">{product.desc}</h5>
                <img
                  src={product.image}
                  alt={product.desc}
                  className="product-row__img"
                />
              </div>


              {/* right: quantity controls */}
              <div className="product-row__controls">
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => this.handleIncrement(product)}
                >
                  +
                </Button>
                <span className="qty-box">{product.value}</span>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => this.handleDecrement(product)}
                >
                  –
                </Button>
                <span className="qty-label">quantity</span>
              </div>
            </div>
          ))}
        </Container>
      </div>
    );
  }
}

export default App;
