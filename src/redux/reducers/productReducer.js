
// for creating slice and AsycnThunk
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the initial state for products
const initialState = {
  products: [],
  cart: [],
  loading: false,
};

// Create an async thunk to fetch products from the API
export const getInitialProductsThunk = createAsyncThunk(
  'products/getInitialProductsThunk',
  async (_,thunkAPI) => {
    try {
        const response = await fetch('https://6570405909586eff6640fd79.mockapi.io/api/v1/products');
        const data = await response.json();
        thunkAPI.dispatch(setProduct(data));
              // Get the cart data from localStorage
        const storedCartData = localStorage.getItem('cart');

        // If there is cart data in localStorage, dispatch setCart action
        if (storedCartData) {
            const parsedCartData = JSON.parse(storedCartData);
            thunkAPI.dispatch(setCart(parsedCartData));
        }
        return data;
    } catch (error) {
        toast.error(`Error in LOADING: ${error.message}`);
        throw error;
    }
  }
);

// Create an async thunk to add a product to the API
export const addProductThunk = createAsyncThunk(
    'products/addProduct',
    async (newProduct, thunkAPI) => {
      try {
        const response = await fetch('https://6570405909586eff6640fd79.mockapi.io/api/v1/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });
  
        const addedProduct = await response.json();
  
        // Dispatch the addProduct action to update the state
        thunkAPI.dispatch(addProduct(addedProduct));

        // notification
        toast.success("Added the product!!");
  
        return addedProduct;
      } catch (error) {
        toast.error(`Error in adding product: ${error.message}`);
        throw error;
      }
    }
  );

// Create an async thunk to delete a product from the API
export const deleteProductThunk = createAsyncThunk(
  'products/deleteProduct',
  async (productId, thunkAPI) => {
    try {
      // Check if the product is in the cart
      const isProductInCart = thunkAPI.getState()
        .productsReducer.cart.some((cartProduct) => cartProduct.id === productId);

      const response = await fetch(`https://6570405909586eff6640fd79.mockapi.io/api/v1/products/${productId}`, {
        method: 'DELETE',
      });

      // If the product is in the cart, also remove it from the cart
      if (isProductInCart) {
        thunkAPI.dispatch(deleteProductFromCart(productId));
      }

      // Get the updated cart data from the state
      const updatedCart = thunkAPI.getState().productsReducer.cart;

      // Update localStorage with the new cart data
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // Dispatch the deleteProduct action to update the state
      thunkAPI.dispatch(deleteProduct(productId));

      // notification
      toast.success("Removed the product!!");

      return productId;
    } catch (error) {
      toast.error(`Error in deleting product: ${error.message}`);
      throw error;
    }
  }
);

// Create an async thunk to edit a product in the API
export const editProductThunk = createAsyncThunk(
  'products/editProduct',
  async ({ productId, updatedProduct }, thunkAPI) => {
    try {

      // Check if the product is in the cart
      const isProductInCart = thunkAPI.getState()
        .productsReducer.cart.some((cartProduct) => cartProduct.id === productId);

      const response = await fetch(`https://6570405909586eff6640fd79.mockapi.io/api/v1/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      const editedProduct = await response.json();

      // If the product is in the cart, also replace it from the cart
      if (isProductInCart) {
        thunkAPI.dispatch(deleteProductFromCart(productId));
      }

      // Dispatch the addProductToCart action to update the state
      thunkAPI.dispatch(addProductToCart(editedProduct));

      // Get the updated cart data from the state
      const updatedCart = thunkAPI.getState().productsReducer.cart;

      // Update localStorage with the new cart data
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // Dispatch the editProduct action to update the state
      thunkAPI.dispatch(editProduct({ productId, editedProduct }));

      // notification
      toast.success("Updated the product details!!");

      return editedProduct;
    } catch (error) {
      toast.error(`Error in editing product: ${error.message}`);
      throw error;
    }
  }
);

export const addProductToCartThunk = createAsyncThunk(
  'cart/addProductToCart',
  async (product, thunkAPI) => {
    try {

      // Check if the product is already in the cart
      const isProductInCart = thunkAPI
        .getState()
        .productsReducer.cart.some((cartProduct) => cartProduct.id === product.id);

      if (isProductInCart) {
        toast.error('Product is already added to the cart');
        return thunkAPI.getState().productsReducer.cart; // Return the current cart without modifying it
      }

      // Dispatch the addProductToCart action to update the state
      thunkAPI.dispatch(addProductToCart(product));

      // Get the updated cart data from the state
      const updatedCart = thunkAPI.getState().productsReducer.cart;

      // Update localStorage with the new cart data
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // notification
      toast.success("Updated the cart!!");

      return updatedCart;
    } catch (error) {
      toast.error(`Error in adding product to cart: ${error.message}`);
      throw error;
    }
  }
);

// Create an async thunk to delete a product from the cart
export const deleteProductFromCartThunk = createAsyncThunk(
  'cart/deleteProductFromCart',
  async (productId, thunkAPI) => {
    try {
      // Dispatch the deleteProductFromCart action to update the state
      thunkAPI.dispatch(deleteProductFromCart(productId));

      // Get the updated cart data from the state
      const updatedCart = thunkAPI.getState().productsReducer.cart;

      // Update localStorage with the new cart data
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // notification
      toast.success("Updated the cart!!");

      return updatedCart;
    } catch (error) {
      toast.error(`Error in deleting product from cart: ${error.message}`);
      throw error;
    }
  }
);

// Create a products slice with reducer
const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    setProduct: (state, action) => {
        state.products = [...action.payload];
    },
    setCart: (state, action) => {
        state.cart = [...action.payload];
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    editProduct: (state, action) => {
      const { productId, editedProduct } = action.payload;
      const index = state.products.findIndex(product => product.id === productId);

      if (index !== -1) {
        state.products[index] = editedProduct;
      }
    },
    addProductToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteProductFromCart: (state, action) => {
      state.cart = state.cart.filter(product => product.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(getInitialProductsThunk.pending, (state) => {
      state.loading = true;
    }).addCase(getInitialProductsThunk.rejected, (state) => {
      state.loading = false;
    }).addCase(getInitialProductsThunk.fulfilled, (state) => {
        state.loading = false;
      });
  },
  });

// exporting the reducer of slice
export const productsReducer=productsSlice.reducer;

// exporting all the actions of reducer
export const { setProduct, 
    setCart,
    addProduct,
    deleteProduct,
    editProduct,
    addProductToCart,
    deleteProductFromCart } = productsSlice.actions;

// selector
export const productsSelector = (state)=>state.productsReducer;