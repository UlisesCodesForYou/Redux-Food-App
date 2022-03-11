import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-Slice";
import cartSlice from "./cart-Slice";

// I NEED TO MAKE SURE TO IMPORT TEH ACTIONS I WANT TO USE INTO THIS MAIN REDUCER!  THIS WILL LET ME ACCESS THEM THROUGHOUT THE APP!
const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store; // This goes where the whole app is rendered.
