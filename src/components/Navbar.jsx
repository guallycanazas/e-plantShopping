import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../redux/CartSlice";

function Navbar() {
  const cartCount = useSelector(selectCartCount);
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
        <Link to="/products">Plants</Link>
        <Link to="/cart">Cart</Link>
      </div>
      <div className="cart-icon">
        <Link to="/cart" aria-label="Cart">
          🛒
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
