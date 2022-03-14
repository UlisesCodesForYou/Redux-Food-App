import {uiActions} from './ui-Slice'




export const fetchCartData = () =>{
   return async(dispatch) => {
       
   }
}

export const sendCartData = (cart) => { //This is the thunk. This will be exported as an action creator into another function. That's why i exported it. 
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "SENDING...",
        message: "SENDING CART DATA",
      })
    );

    const sendRequest = async () => { //This holds the logic for sending and receiving the response.
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
    };

    try {
      await sendRequest(); //I called sendRequest here in case it succeeds/fails.  That's why I have the success and error dispatch actions. 
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "SUCCESS!",
          message: "SENT CART DATA SUCCESSFULLY!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "ERROR!",
          message: "FAILED TO SEND CART DATA",
        })
      );
    }
  };
};