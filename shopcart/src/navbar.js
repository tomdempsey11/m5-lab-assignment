// src/navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const Navbar = ({ totalQty }) => {
  return (
    <nav className="topbar">
      {/* clicking the title goes home */}
      <Link to="/" className="topbar__title">
        Shop to React
      </Link>

      <Link to="/cart" className="topbar__cart">
        <FontAwesomeIcon icon={faShoppingCart} />
        <span>
          {totalQty} {totalQty === 1 ? "item" : "items"}
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
