import { useEffect } from "react";
import Notification from "./components/UI/notification";

import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./components/store/ui-Slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible); // Remember that this receives the redux state.  I just have to drill into it. 9
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "SENDING...",
          message: "SENDING CART DATA",
        })
      );
      const response = await fetch(
        "https://menu-5b54e-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT", // This method replaces the previous data with new data.
          body: JSON.stringify(cart), // This transforms the cart redux data to json data.
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "SUCCESS!",
          message: "SENT CART DATA SUCCESSFULLY!",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "ERROR!",
          message: "FAILED TO SEND CART DATA",
        })
      );
    });
  }, [cart, dispatch]);
  return (
    <>
      <Layout>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
