import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("home");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleMenuClick = (item) => {
      setMenu(item);
      setMobileMenuOpen(false); 
    };

    return (
      <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
        <div className="navbar-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`navbar-menu${mobileMenuOpen ? ' open' : ''}`}>
          <li>
            <Link to='/' onClick={()=>handleMenuClick("home")} className={menu==="home"?"active":""}>home</Link>
          </li>
          <li>
            <a href='#explore-menu' onClick={()=>handleMenuClick("menu")} className={menu==="menu"?"active":""}>menu</a>
          </li>
          <li>
            <a href='#app-download' onClick={()=>handleMenuClick("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
          </li>
          <li>
            <a href='#footer' onClick={()=>handleMenuClick("contact-us")} className={menu==="contact-us"?"active":""}>contact-us</a>
          </li>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className="dot"></div>
          </div>
          <button onClick={()=>setShowLogin(true)}>sign in</button>
        </div>
      </div>
    )
}

export default Navbar;