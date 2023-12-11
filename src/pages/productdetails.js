import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { productsSelector, addProductToCartThunk } from '../redux/reducers/productReducer';
import styles from '../styles/ProductDetail.module.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const { products } = useSelector(productsSelector);
  const dispatch = useDispatch();

  // Find the product with the matching id
  const product = products.find((product) => product.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Handle adding the product to the cart
  const handleAddToCart = () => {
    // Dispatch the addProductToCartThunk to add the product to the cart
    dispatch(addProductToCartThunk(product));
    };

    return (
      <div className={styles.productDetail}>
        <h2 style={{ textAlign:"center" }}>{product.title} Details</h2>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img src={product.thumbnail} alt={product.title} className={styles.circularImage} />
          </div>
          <div className={styles.infoContainer}>
            <p>Price: ${product.price}</p>
            <p>Rating: {Array.from({ length: Math.floor(product.rating) }).map((_, index) => (
              <span key={index} className={styles.star}>★</span>
            ))}</p>
            <p>Discount Percentage: {product.discountPercentage}%</p>
            <p>Stock: {product.stock}</p>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <span onClick={handleAddToCart}  style={{ fontSize:"40px" }} >
              {/* Add to cart icon */}
              <i class="fa-solid fa-cart-plus"></i>
            </span>
            {/* <button onClick={handleAddToCart}>Add to Cart</button> */}
          </div>
        </div>
        <div className={styles.descriptionSection}>
          <h3>Description:</h3>
          <p>{product.description}</p>
        </div>
      </div>
    );
  };

export default ProductDetails;
