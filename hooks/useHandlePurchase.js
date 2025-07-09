import { useCartContext } from "context/useCartContext";
import Axios from "lib/axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const useHandlePurchase = ({
  slug,
  package: packageName,
  support,
  product,
}) => {
  const router = useRouter();
  const isSyncingRef = useRef(false); // Tracks if a sync request is already in progress

  const [localProduct, setLocalProduct] = useState([]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    setLocalProduct(cart ? JSON.parse(cart) : []);
  }, []);

  const { data: session } = useSession();
  const {
    cartState: { carts },
  } = useCartContext();

  const syncCartToDatabase = async () => {
    if (!session || isSyncingRef.current) return; // Avoid multiple requests

    isSyncingRef.current = true; // Mark sync as in progress

    try {
      const isProductInCart = carts?.some(
        (d) => d.slug === slug && d.package === packageName,
      );
      if (!isProductInCart) {
        await Axios.post(
          "product-cart",
          {
            products: [
              {
                slug: slug,
                package: packageName,
                support: support,
                title: product.title,
                image: product.image,
                price: product.price,
              },
            ],
            user_email: session?.user?.email,
            user_id: session?.user?.id,
            first_name: session.user.first_name,
            last_name: session.user.last_name,
            current_time: new Date().toISOString(),
          },
          {
            headers: {
              authorization: `Bearer ${session?.user?.accessToken}`,
            },
          },
        );
      }
    } catch (error) {
      if (
        error?.response?.status === 401 ||
        error?.response?.data?.message === "jwt expired"
      ) {
        signOut();
      }
    } finally {
      isSyncingRef.current = false; // Reset sync state
    }
  };

  const addCart = () => {
    const isAlreadyInLocalCart = localProduct.some(
      (d) => d.slug === slug && d.package === packageName,
    );

    if (!isAlreadyInLocalCart) {
      const updatedCart = [
        ...localProduct,
        {
          slug: slug,
          package: packageName,
          support: support,
          title: product.title,
          image: product.image,
          price: +product.price,
        },
      ];

      // Update local storage immediately
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setLocalProduct(updatedCart);
    }

    // Redirect to checkout immediately
    router.push("/checkout");

    // Sync cart to database in the background
    if (session) {
      syncCartToDatabase();
    }
  };

  return addCart;
};

export default useHandlePurchase;
