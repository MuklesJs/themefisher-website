import config from "@/config/config.json";
import Image from "next/image";

const PaymentOptions = ({ className }) => {
  const { payment_logo } = config;
  return (
    <div className={`${className} text-center rounded-lg`}>
      <p className="mb-1 block align-middle">
        <Image
          src={"/images/icons/secure.svg"}
          width={20}
          height={20}
          alt="secure"
          className="inline-block mr-2 align-text-bottom"
        />
        100% Safe and Secure Payments Powered by -{" "}
        <Image
          src={"/images/icons/paddle.svg"}
          width={60}
          height={20}
          alt="ssl"
          className="inline-block align-text-bottom"
        />
      </p>
      <small className="inline-block text-gray-500 mb-3">
        A VAT receipt will be provided via email after making purchase.
      </small>
      <div className="flex justify-center flex-wrap">
        {payment_logo.map((item) => (
          <span
            key={item.name}
            className="max-h-[30px] max-w-[45px] m-1.5 border border-border rounded-sm"
          >
            <Image
              alt={item.name}
              src={item.src}
              width={60}
              height={40}
              className="h-auto w-full"
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default PaymentOptions;
