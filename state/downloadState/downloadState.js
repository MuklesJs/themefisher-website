import Axios from "@/lib/axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useReducer } from "react";
import { downloadReducer } from "state/downloadState/downloadReducer";

const downloadStates = () => {
  const initialState = {
    loading: false,
    downloads: [],
    error: false,
  };
  const { data: session } = useSession();
  const [downloadState, downloadDispatch] = useReducer(
    downloadReducer,
    initialState,
  );

  useEffect(() => {
    if (session) {
      downloadDispatch({
        type: "FETCHING_START",
      });

      const fetchDownload = async () => {
        try {
          const fetchData = await Axios.get(
            `/download-history/${session?.user?.id}`,
            {
              headers: {
                authorization: `Bearer ${session?.user?.accessToken}`,
              },
            },
          );

          if (fetchData.status == 200) {
            downloadDispatch({
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
      fetchDownload();
    }
  }, [session?.user?.id]);

  return {
    downloadState: downloadState,
    downloadDispatch: downloadDispatch,
  };
};

export default downloadStates;
