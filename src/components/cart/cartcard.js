import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProductFromCartThunk } from '../../redux/reducers/productReducer';
import StarRating from '../home/StarRating';
// Import the styles module
import styles from "../../styles/card.module.css";
import { BsCartXFill } from "react-icons/bs";

const CartCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    // Dispatch the deleteProductFromCartThunk to remove the product from the cart
    dispatch(deleteProductFromCartThunk(product.id));
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <p>Rating: <StarRating rating={product.rating} /></p>
      <span onClick={handleRemoveFromCart}>
        <BsCartXFill size={20} />
      </span>
    </div>
  );
};

export default CartCard;
