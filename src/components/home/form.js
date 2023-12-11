import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addProductThunk, editProductThunk } from '../../redux/reducers/productReducer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// css styles 
import styles from "../../styles/form.module.css"; 

const ProductForm = ({ updateProduct, setUpdateProduct, setShowProductForm }) => {
  const dispatch = useDispatch();
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productDiscountPercentage, setProductDiscountPercentage] = useState('');
  const [productRating, setProductRating] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);

  const productTitleRef = useRef();
  const productPriceRef = useRef();
  const productDescriptionRef = useRef();
  const productDiscountPercentageRef = useRef();
  const productRatingRef = useRef();
  const productStockRef = useRef();
  const productBrandRef = useRef();
  const productCategoryRef = useRef();
  const productThumbnailRef = useRef();

  useEffect(() => {
    if (updateProduct) {
      // If there's an updateProduct, populate the form with its data
      setProductTitle(updateProduct.title);
      setProductPrice(updateProduct.price);
      setProductDescription(updateProduct.description);
      setProductDiscountPercentage(updateProduct.discountPercentage);
      setProductRating(updateProduct.rating);
      setProductStock(updateProduct.stock);
      setProductBrand(updateProduct.brand);
      setProductCategory(updateProduct.category);
      setProductThumbnail(updateProduct.thumbnail);
      setIsUpdate(true);
    };
    // Focus on the productTitle input when the form is mounted or updated
    productTitleRef.current.focus();
  }, [updateProduct]);

  // Clear all form fields
  const clearForm = () => {
    setProductTitle('');
    setProductPrice('');
    setProductDescription('');
    setProductDiscountPercentage('');
    setProductRating('');
    setProductStock('');
    setProductBrand('');
    setProductCategory('');
    setProductThumbnail('');
    // Focus on the productTitle input after clearing the form
    productTitleRef.current.focus();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (parseFloat(productPrice) < 1) {
        toast.error('Product price must be greater than or equal to 1');
        return;
        }
    
    if (parseFloat(productDiscountPercentage) < 0 || parseFloat(productDiscountPercentage) > 100) {
        toast.error('Discount percentage must be between 0 and 100');
        return;
        }
    
    if (parseFloat(productRating) < 0 || parseFloat(productRating) > 5) {
        toast.error('Product rating must be between 0 and 5');
        return;
        }
    
    if (parseFloat(productStock) < 0) {
        toast.error('Product stock must be greater than or equal to 0');
        return;
        }

    const newProduct = {
      title: productTitle,
      price: parseFloat(productPrice),
      description: productDescription,
      discountPercentage: parseFloat(productDiscountPercentage),
      rating: parseFloat(productRating),
      stock: parseFloat(productStock),
      brand: productBrand,
      category: productCategory,
      thumbnail: productThumbnail,
    };

    if (isUpdate) {
      // Dispatch the editProductThunk to update the product
      dispatch(editProductThunk({ productId: updateProduct.id, updatedProduct: newProduct }));
      setIsUpdate(false);
      setUpdateProduct(null);
      setShowProductForm(false);
    } else {
      // Dispatch the addProductThunk to add the new product
      dispatch(addProductThunk(newProduct));
    }

    // Reset the form and state
    clearForm();
  };

  return (
    <div className={styles.formContainer}>
      <h1>{isUpdate ? 'Update Product' : 'Add a Product'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="productTitle">Enter Product Title</label>
            <input
              type="text"
              id="productTitle"
              placeholder="Enter ProductTitle"
              ref={productTitleRef}
              value={productTitle}
              className={styles.box}
              onChange={(e) => setProductTitle(e.target.value)}
              required
            />
        </div>
        <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="productDescription">Enter Product Description</label>
            <input
              type="text"
              id="productDescription"
              placeholder="Enter Product Description"
              ref={productDescriptionRef}
              value={productDescription}
              className={styles.description}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
        </div>
        <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="productBrand">Enter Product Brand</label>
            <input
              type="text"
              id="productBrand"
              placeholder="Enter Product Brand"
              ref={productBrandRef}
              value={productBrand}
              className={styles.box}
              onChange={(e) => setProductBrand(e.target.value)}
              required
            />
        </div>
        <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="productCategory">Enter Product Category</label>
            <input
              type="text"
              id="productCategory"
              placeholder="Enter Product Category"
              ref={productCategoryRef}
              value={productCategory}
              className={styles.box}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            />
        </div>
        <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="productThumbnail">Enter Product Thumbnail URL</label>
            <input
              type="text"
              id="productThumbnail"
              placeholder="Enter Product Thumbnail URL"
              ref={productThumbnailRef}
              value={productThumbnail}
              className={styles.box}
              onChange={(e) => setProductThumbnail(e.target.value)}
              required
            />
        </div>
        <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="productPrice">Enter Product Price</label>
            <input
              type="number"
              id="productPrice"
              placeholder="Enter Product Price"
              ref={productPriceRef}
              value={productPrice}
              className={styles.box}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
        </div>
        <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="productDiscountPercentage">Enter Product Discount Percentage</label>
            <input
              type="number"
              id="productDiscountPercentage"
              placeholder="Enter Product Discount Percentage"
              ref={productDiscountPercentageRef}
              value={productDiscountPercentage}
              className={styles.box}
              onChange={(e) => setProductDiscountPercentage(e.target.value)}
            />
        </div>
        <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="productRating">Enter Product Rating</label>
            <input
              type="number"
              id="productRating"
              placeholder="Enter Product Rating"
              ref={productRatingRef}
              value={productRating}
              className={styles.box}
              onChange={(e) => setProductRating(e.target.value)}
              required
            />
        </div>
        <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="productStock">Enter Product Stock</label>
            <input
              type="number"
              id="productStock"
              placeholder="Enter Product Stock"
              ref={productStockRef}
              value={productStock}
              className={styles.box}
              onChange={(e) => setProductStock(e.target.value)}
              required
            />
        </div>
        <br />
        <button type="submit" className={`${styles.btn} ${styles.add}`}>
          {isUpdate ? 'Update Product' : 'Add Product'}
        </button>
        <button className={`${styles.btn} ${styles.clear}`} onClick={clearForm}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
