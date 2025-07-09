import Axios from "@/lib/axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { cartReducer } from "state/cartState/cartReducer";

const initialState = {
  loading: true,
  carts: [],
  id: "",
  coupon: "",
  method: "",
  error: false,
  success: false,
  support: false,
  service: false,
  discountForm: false,
  discountCode: "",
  discountAmount: "",
};

const cartStates = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [cartState, cartDispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (session) {
      cartDispatch({
        type: "FETCHING_START",
      });

      const fetchCart = async () => {
        try {
          const fetchData = await Axios.get(
            `/product-cart/${session?.user?.id}`,
            {
              headers: {
                authorization: `Bearer ${session?.user?.accessToken}`,
              },
            },
          );

          if (fetchData.status == 200) {
            cartDispatch({
              type: "FETCHING_SUCCESS",
              payload: fetchData.data.result,
            });
          }
        } catch (error) {
          console.log(error, error);
          if (
            error?.response?.status === 401 ||
            error?.response?.data?.message === "jwt expired"
          ) {
            signOut();
          }
        }
      };
      fetchCart();
    }
  }, [router.asPath]);

  return {
    cartState: cartState,
    cartDispatch: cartDispatch,
  };
};

export default cartStates;
