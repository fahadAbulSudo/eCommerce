import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInitialProductsThunk } from './redux/reducers/productReducer';
import { createBrowserRouter,RouterProvider } from "react-router-dom";

// all the pages and component to render
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home";
import ProductDetails from './pages/productdetails';
import Cart from "./pages/cart";
import Error from "./pages/error";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
        // Fetch initial products when the component mounts
        dispatch(getInitialProductsThunk());
    }, []);
    // }, [dispatch]);

  // all the link routes
  const router = createBrowserRouter([
    {
      path:"/", 
      element: <Navbar />,
      errorElement: <Error />,
      children:[
        { index:true, element: <Home/>},
        {
          path: '/:productId',
          element: <ProductDetails/>
        },
        { path:"/cart", element: <Cart />},
      ]
    }
  ]);

  return (
    <>
      {/* routes */}
        <RouterProvider router={router} />
    </>
  );
}

export default App;

