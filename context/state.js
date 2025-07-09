import products from "@/json/products.json";
import Axios from "lib/axios";
import countryDetector from "lib/utils/countryDetector";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect } from "react";
import { getCookie } from "react-use-cookie";

const AppContext = createContext();

export const AppWrapper = ({ children }) => {
  const allCategories = products.map((p) => p.frontmatter.categories);
  const { data: session } = useSession();

  // update user-log
  useEffect(() => {
    if (session) {
      const updateLog = async () => {
        await Axios.patch(`/user-log/${session?.user?.id}`, {
          first_visit: new Date(getCookie("welcomeDate"))
            .toISOString()
            .slice(0, 10),
          referrer: getCookie("welcomeReferrer"),
          landing_page: getCookie("welcomeLandingPage"),
          device: navigator.platform,
        });
      };
      updateLog();
    }
  }, [session?.user?.id]);

  // update user-log visit
  useEffect(() => {
    if (session) {
      const updateVisit = async () => {
        await Axios.patch(`user-log/visit/${session?.user?.id}`, {
          date: new Date().toISOString().slice(0, 10),
        });
      };
      updateVisit();
    }
  }, [session?.user?.id]);

  // update user country
  useEffect(() => {
    if (session) {
      const country = countryDetector();
      const updateCountry = async () => {
        await Axios.patch(`/user/update-country/${session?.user?.id}`, {
          country: country,
        });
      };
      updateCountry();
    }
  }, [session?.user?.id]);

  // set product categories
  let categories = [];
  for (let i = 0; i < allCategories?.length; i++) {
    const categoryArray = allCategories[i];
    for (let j = 0; j < categoryArray?.length; j++) {
      categories.push(categoryArray[j]);
    }
  }
  const category = [...new Set(categories)];
  let state = {
    products,
    category,
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
