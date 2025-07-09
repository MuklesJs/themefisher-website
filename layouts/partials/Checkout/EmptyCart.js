import Image from "next/image";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="pt-20">
      <div className="py-20 rounded-xl bg-white text-center">
        <Image
          src="/images/empty-cart.svg"
          width={200}
          height={125}
          alt="empty-cart"
          className="mb-8 mx-auto w-[192px] h-[120px]"
        />
        <h3 className="mb-4">Your Product Cart is Empty!</h3>
        <p className="max-w-[350px] mx-auto mb-6">
          Before proceed to checkout, you must add some products to your cart.
        </p>
        <Link href="/products" className="btn btn-primary">
          Return to shop
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
