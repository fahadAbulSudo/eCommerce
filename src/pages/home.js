import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { productsSelector } from '../redux/reducers/productReducer';
import ProductCard from '../components/home/card';
import ProductForm from '../components/home/form';
import AddButton from '../components/home/AddButton';
import SortButton from '../components/home/SortButton';
// show loading spinner on first render
import Loader from "../components/loader/loader";
// Import the styles module
import styles from "../styles/card.module.css";

const Home = () => {
    
    const { products, loading } = useSelector(productsSelector);

    // to show or hide add Product form
    const [showProductForm,setShowProductForm] = useState(false);
    // for updating an Product
    const [updateProduct,setUpdateProduct] = useState(null);
    // for the sort of product cards.
    const [sortByPrice, setSortByPrice] = useState(false);

    // updating any Product
    function handleProductEdit(product){
        setUpdateProduct(product);
        setShowProductForm(true);
    }

    const handleToggleSort = () => {
        // Toggle between sorting by price and sorting by id
        setSortByPrice((prevSortByPrice) => !prevSortByPrice);
      };

    const handleToggleProductForm = () => {
        setShowProductForm(!showProductForm);
        // If "Cancel" is clicked, setUpdateProduct to null
        if (showProductForm === false) {
          setUpdateProduct(null);
        }
      };
    
    const sortedProducts = [...products].sort((a, b) => {
        if (sortByPrice) {
          return a.price - b.price;
        } else {
          return a.id - b.id;
        }
      });

    return (
      <>
        {loading?<Loader />:
            <>
              <div>
              <AddButton onClick={handleToggleProductForm} isFormOpen={showProductForm} />
              <SortButton onClick={handleToggleSort} isSorted={sortByPrice} />

              <div style={{textAlign:"center"}}>
                      {showProductForm && <ProductForm 
                                                  updateProduct={updateProduct}
                                                  setUpdateProduct={setUpdateProduct}
                                                  setShowProductForm={setShowProductForm} />}
              </div>

              <div className={styles.cardContainer}>
                  {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} handleProductEdit={handleProductEdit} />
                  ))}
              </div>
              </div>
            </>}
      </>
    );
};

export default Home;
