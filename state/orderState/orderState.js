import Axios from "@/lib/axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { orderReducer } from "state/orderState/orderReducer";

const orderStates = () => {
  const router = useRouter();
  const initialState = {
    loading: false,
    orders: {},
    subtotal: 0,
    discount: 0,
    error: false,
    success: false,
  };
  const { data: session } = useSession();
  const [orderState, orderDispatch] = useReducer(orderReducer, initialState);

  useEffect(() => {
    if (session) {
      orderDispatch({
        type: "FETCHING_START",
      });

      const fetchOrder = async () => {
        try {
          const fetchData = await Axios.get(`/order/${session?.user?.id}`, {
            headers: {
              authorization: `Bearer ${session?.user?.accessToken}`,
            },
          });

          if (fetchData.status == 200) {
            orderDispatch({
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
      fetchOrder();
    }
  }, [router.asPath, session?.user?.id]);

  return {
    orderState: orderState,
    orderDispatch: orderDispatch,
  };
};

export default orderStates;
