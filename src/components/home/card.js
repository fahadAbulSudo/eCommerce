import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProductThunk, addProductToCartThunk } from '../../redux/reducers/productReducer';
import { Link } from 'react-router-dom';
import StarRating from './StarRating'; 
// Import the styles module
import styles from "../../styles/card.module.css";



const ProductCard = (props) => {
  // const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const { product, handleProductEdit }=props;

  const handleDeleteProduct = () => {
    // Dispatch the deleteProductThunk to delete the product
    dispatch(deleteProductThunk(product.id));
  };

  const handleAddToCart = () => { 
    // Dispatch the addProductToCartThunk to add the product to the cart
    dispatch(addProductToCartThunk(product));
  };

  const handleProductEditAndScrollTop = () => {
    // Call the handleProductEdit function to handle the edit action
    handleProductEdit(product);

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div  className={styles.card}>
      <div className={styles.imageContainer}>
        <Link to={`/${product.id}`}>
          <img src={product.thumbnail} alt={product.title}/>
        </Link>
      </div>
      <h3>{product.title}</h3>
      {/* {toggle?<input type="text"
              id="productTitle"
              placeholder="Enter ProductTitle"/>:<h3>{product.title}</h3>}
      <button onClick={()=>setToggle((prev)=>!prev)}> editTitle </button> */}
      <p>Price: ${product.price}</p>
      <p>Rating: <StarRating rating={product.rating} /></p>
      <span className={styles.pencil} onClick={()=>handleProductEditAndScrollTop(product)}>
        {/* Edit icon */}
        <i class="fa-sharp fa-solid fa-pencil"></i>
      </span>
      <span className={styles.trash} onClick={handleDeleteProduct}>
        {/* Delete icon */}
        <i class="fa-solid fa-trash"></i>
      </span>
      <span className={styles.cart} onClick={handleAddToCart}>
        {/* Add to cart icon */}
        <i class="fa-solid fa-cart-plus"></i>
      </span>
      {/* <button onClick={handleAddToCart}>Add to Cart</button> */}
    </div>
  ); 
};

export default ProductCard;
