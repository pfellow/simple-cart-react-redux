import { cartActions } from ".";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-b0b4e-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong with fetching data");
      }

      const data = await response.json();

      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (err) {
      dispatch(
        cartActions.showNotification({ status: "Fetching cart data failed" })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(cartActions.showNotification({ status: "pending" }));

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-b0b4e-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(cartActions.showNotification({ status: "success" }));
    } catch (err) {
      dispatch(cartActions.showNotification({ status: "httpError" }));
    }
  };
};
