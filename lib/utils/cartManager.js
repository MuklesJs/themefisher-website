import Axios from "lib/axios";

// add module-level flag to prevent duplicate updates
let updateCartInProgress = false;

// update cart item
export const updateCartItem = async (products, session, cartDispatch) => {
  if (!products) return;

  const getLocalCart = JSON.parse(localStorage.getItem("cart")) || [];

  const mergeLocalAndDbCarts = [...(products || []), ...(getLocalCart || [])];

  const uniqueItems = mergeLocalAndDbCarts.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (item) => item.slug === value.slug && item.package === value.package,
      ),
  );

  // update local cart
  localStorage.setItem("cart", JSON.stringify(uniqueItems));

  // update cart state
  cartDispatch({
    type: "ADD_CART",
    payload: uniqueItems,
  });

  if (session && uniqueItems?.length) {
    if (updateCartInProgress) return; // prevent duplicate requests

    updateCartInProgress = true;
    try {
      await Axios.post(
        "product-cart",
        {
          products: uniqueItems.map((item) => ({
            slug: item.slug,
            package: item.package,
            support: item.support,
            title: item.title,
            image: item.image,
            price: item.price,
            upgraded: item.upgraded,
          })),
          user_id: session?.user?.id,
          user_email: session?.user?.email,
          user_name: session?.user?.user_name,
          current_time: new Date().toISOString(),
        },
        {
          headers: {
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        },
      );
    } catch (error) {
      console.error(error);
      if (
        error?.response?.status === 401 ||
        error?.response?.data?.message === "jwt expired"
      ) {
        signOut();
      }
    } finally {
      updateCartInProgress = false;
    }
  }
};

// delete a cart item
export const deleteCartItem = async (
  slug,
  packageName,
  session,
  cartDispatch,
) => {
  try {
    const getLocalCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Remove the item locally
    const updatedCart = getLocalCart.filter(
      (item) => !(item.slug === slug && item.package === packageName),
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Always update the cart state with the latest local cart
    if (typeof cartDispatch === "function") {
      cartDispatch({
        type: "ADD_CART",
        payload: updatedCart,
      });
    }

    // If a session exists, sync with the server
    if (session) {
      await Axios.delete(
        `/product-cart/delete/${session?.user?.id}?slug=${slug}&package=${packageName}`,
        {
          headers: {
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        },
      );
    }

    return true;
  } catch (error) {
    console.error("Error deleting cart item:", error);

    if (
      error?.response?.status === 401 ||
      error?.response?.data?.message === "jwt expired"
    ) {
      signOut();
    }

    return false;
  }
};

// clear the entire cart
export const clearCart = async (session, cartDispatch) => {
  // Remove from local storage
  localStorage.removeItem("cart");
  // Remove from database if session exists
  if (session?.user?.id && session?.user?.accessToken) {
    try {
      await Axios.delete(`/product-cart/clear/${session.user.id}`, {
        headers: {
          authorization: `Bearer ${session.user.accessToken}`,
        },
      });
    } catch (error) {
      console.error("Error clearing cart from DB:", error);
    }
  }
  // update cart state
  if (typeof cartDispatch === "function") {
    cartDispatch({ type: "ADD_CART", payload: [] });
    cartDispatch({ type: "CHANGE_SUPPORT", payload: false });
    cartDispatch({ type: "CHANGE_DISCOUNT_FORM", payload: false });
    cartDispatch({ type: "CHANGE_DISCOUNT_CODE", payload: "" });
    cartDispatch({ type: "CHANGE_DISCOUNT", payload: "" });
  }
};
