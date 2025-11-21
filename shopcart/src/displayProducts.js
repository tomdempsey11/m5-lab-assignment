// src/displayProducts.js
import React, { useState } from "react";
import { Container } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCircle } from "@fortawesome/free-solid-svg-icons";

const DisplayProducts = ({
  products,
  onIncrement,
  onDecrement,
  sortOption,
  onSortChange,
}) => {
  const [show, setShow] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setActiveProduct(product);
    setShow(true);
  };

  return (
    <Container className="p-0">
      {/* 🔽 Sort dropdown */}
      <div className="sort-bar">
        <span className="sort-label">Sort Price By:</span>
        <select
          className="sort-dropdown"        // 👈 added className
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="Normal">Normal</option>
          <option value="Lowest">Lowest</option>
          <option value="Highest">Highest</option>
        </select>
      </div>

      {products.map((product) => (
        <div key={product.id} className="product-row">
          {/* left side: title + image */}
          <div className="product-left">
            <h5 className="product-title">
              {product.desc}{" "}
              <span className="product-price">${product.price}</span>
            </h5>
            <img
              src={product.image}
              alt={product.desc}
              className="product-row__img"
              onClick={() => handleShow(product)}
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* right side: quantity controls */}
          <div className="product-row__controls">
            <div className="qty-btn-group">
              <button
                type="button"
                className="qty-btn"
                onClick={() => onIncrement(product)}
              >
                <span className="fa-stack">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="fa-stack-2x gray-square"
                  />
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="fa-stack-1x inner-symbol"
                  />
                </span>
              </button>

              <button
                type="button"
                className="qty-btn"
                onClick={() => onDecrement(product)}
              >
                <span className="fa-stack">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="fa-stack-2x gray-square"
                  />
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="fa-stack-1x inner-symbol"
                  />
                </span>
              </button>
            </div>

            <div className="qty-display">
              <span className="qty-label">Quantity</span>
              <span className="qty-box">{product.value}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Modal (lightbox) */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {activeProduct ? activeProduct.desc : "Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {activeProduct && (
            <div className="modal-product">
              <img
                src={activeProduct.image}
                alt={activeProduct.desc}
                className="modal-product__img"
              />
              <p className="modal-product__ratings">
                Ratings: {activeProduct.ratings} / 5
              </p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DisplayProducts;
