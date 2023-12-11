import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { productsSelector } from "../redux/reducers/productReducer";
import CartCard from '../components/cart/cartcard';
// Import the styles module
import styles from "../styles/card.module.css";

const Cart = () => {
  const [cartLength, setCartLength] = useState(0);
  const { cart } = useSelector(productsSelector);
  useEffect(() => {
    if (cart) {
      setCartLength(cart.length);
    }
  }, [cart]);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartLength === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className={styles.cardContainer}>
          {cart.map((product) => (
            <CartCard key={product.id} product={product} />
          ))}
        </div> 
      )}
    </div>
  );
};

export default Cart;
