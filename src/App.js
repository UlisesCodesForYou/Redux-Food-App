import { useEffect } from "react";

import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible); // Remember that this receives the redux state.  I just have to drill into it. 9
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    fetch("https://menu-5b54e-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT", // This method replaces the previous data with new data.  
      body: JSON.stringify(cart),  // This transforms the cart redux data to json data. 
    });
  }, [cart]);
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
