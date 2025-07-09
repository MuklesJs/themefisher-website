import Image from "next/image";

const PurchaseCard = ({ product }) => {
  return product.theme.title === "Bundle" ? (
    "bundle"
  ) : (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <Image
          src={product?.theme?.image}
          width={106}
          height={80}
          alt="alt"
          className="rounded-md border border-border"
        />
        <div className="ml-4">
          <p className="text-base font-semibold text-dark">
            {product?.theme?.title}
          </p>
          <span className="text-xs text-light">{product?.theme?.subtitle}</span>
        </div>
      </div>
      <button className="btn bg-[#23C856] text-white hover:bg-[#23C856] ">
        Download
      </button>
    </div>
  );
};

export default PurchaseCard;
