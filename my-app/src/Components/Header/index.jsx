

import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../Assests/Images/logo.jpeg"; 
import './index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faHeart, faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`header ${menuOpen ? "show-menu" : ""}`}> 
      {/* Top Bar Hidden in Mobile View */}
      <div className="top-ber">
        <a href="">
          <img src={logo} alt="logo" className="logo" />
          <p>RippleAid</p>
        </a>
        <form action="">
          <input type="text" placeholder="Search" />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Hamburger Menu Button */}
      <button className="hamburger" onClick={toggleMenu}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>

      {/* Navigation Bar */}
      <div className={`nav-ber ${menuOpen ? "show" : ""}`}>
        <ul className="nav-menu">
          <li><Link to="/" className="active">Home</Link></li>
          
          {/* <li><Link to="/about">About</Link></li> */}
          <li><Link to="/affected-areas">Affect Areas</Link></li>
          <li><Link to="/aids">Aids</Link></li>
          <li><Link to="/donations">Donations</Link></li>
          <li><Link to="/rehabulation-center">Rehabulation Center</Link></li>
          <li><Link to="/activities">Activity</Link></li>
          <li><Link to="/posts">Pages</Link></li>
          <li><Link to="/tcenters">Training Center</Link></li>
          <li><Link to="/products">Products</Link></li>
          
          <li><Link to="/contact">Contact</Link></li>
        

        </ul>

        {/* Icons */}
        <ul className="nav-icons">
          <li><Link to="/login"><FontAwesomeIcon icon={faUserPlus} /></Link></li>
          <li><Link to="/wishlist"><FontAwesomeIcon icon={faHeart} /></Link></li>
          <li><Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} /></Link></li>
        </ul>
      </div>
    </div>
  );
};
