import Axios from "@/lib/axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { userReducer } from "state/userState/userReducer";

const userStates = () => {
  const router = useRouter();
  const initialState = {
    loading: false,
    users: {
      email: "",
      first_name: "",
      last_name: "",
      country: "",
      state: "",
      image: "",
    },
    id: "",
    email: "",
    error: false,
  };
  const { data: session } = useSession();
  const [userState, userDispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (session) {
      userDispatch({
        type: "FETCHING_START",
      });

      const fetchOrder = async () => {
        try {
          const fetchData = await Axios.get(`/user/${session?.user?.id}`, {
            headers: {
              authorization: `Bearer ${session?.user?.accessToken}`,
            },
          });
          if (fetchData.status == 200) {
            userDispatch({
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
    userState: userState,
    userDispatch: userDispatch,
  };
};

export default userStates;
