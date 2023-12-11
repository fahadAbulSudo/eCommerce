
// redux tools for calling actions and getting data from store
import { useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';

// css styles 
import styles from "../../styles/navbar.module.css";

// import form react router
import { Outlet, NavLink } from "react-router-dom";

import { productsSelector } from "../../redux/reducers/productReducer";
import { FaHome, FaShoppingCart, FaShopify } from "react-icons/fa";


// Navbar Component
export default function Navbar(){
    
  const [cartLength, setCartLength] = useState(0);
    // Get the cart items
    const { cart } = useSelector(productsSelector);
    useEffect(() => {
      if (cart) {
        setCartLength(cart.length);
      }
    }, [cart]);

    
    return (
        <>
          <div className={styles.navbarContainer}>
            <div className={styles.appName}>
                    <NavLink to="/">
                        {/* logo of the app */}
                        <FaShopify size={30} />
                        E-Commerce
                    </NavLink>
            </div>
            {/* all the navigation link */}
            <div className={styles.navLinks}>
              <NavLink  className={styles.home}
                style={({ isActive }) =>
                  isActive ? { color: "brown" } : undefined
                }
                to="/"
              >
                <span>
                  <FaHome size={30} />
                </span>
              </NavLink>
      
              <NavLink
                style={({ isActive }) =>
                  isActive ? { color: "brown" } : undefined
                }
                to="/cart"
              >
                <span>
                   <FaShoppingCart size={30} />
                </span>
              </NavLink>
              {cartLength > 0 && (
                <span
                  style={{
                    backgroundColor: "red",
                    top: "-15px",
                    right: "12px",
                    position: "relative",
                    color: "white",
                    borderRadius: "50%",
                    padding: "0px 5px",
                    fontSize: ".8rem",
                  }}
                >
                  {cartLength}
                </span>
              )}
              
            </div>
          </div>
          <Outlet />
        </>
      );
};