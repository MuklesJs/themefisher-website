const OrderSummary = ({
  carts,
  discountAmount,
  sumOfCartPrice,
  priceAfterDiscount,
  service,
  customizationPkg,
  support,
  premiumSupportPkg,
  processingFee,
}) => (
  <div className="bg-white rounded-lg overflow-hidden">
    <div className="py-3 px-6 bg-theme-light">
      <h3 className="text-h6">Order Summary</h3>
    </div>
    <div className="px-6 mt-4">
      <ul className="space-y-2 mb-4 border-b pb-4">
        {carts.map((item, i) => (
          <li key={i} className="flex justify-between">
            <span>{item.title}</span>{" "}
            <span className="text-dark font-semibold">
              ${Number(item.price).toFixed(2)}
            </span>
          </li>
        ))}
        {discountAmount && (
          <li className="flex justify-between">
            <span>Product Discount</span>{" "}
            <span className="text-[#27C762]">
              - ${Number(sumOfCartPrice - priceAfterDiscount).toFixed(2)}
              {discountAmount?.endsWith("%") ? ` (` + discountAmount + `)` : ""}
            </span>
          </li>
        )}
        {service && (
          <li className="flex justify-between">
            <span>{customizationPkg.title}</span>{" "}
            <span className="text-dark font-semibold">
              ${Number(customizationPkg.price).toFixed(2)}
            </span>
          </li>
        )}
        {support && (
          <li className="flex justify-between">
            <span>{premiumSupportPkg.title}</span>{" "}
            <span className="text-dark font-semibold">
              ${Number(premiumSupportPkg.price).toFixed(2)}
            </span>
          </li>
        )}
        <li className="flex justify-between">
          <span>Payment Processing Fee</span>{" "}
          <span className="text-dark font-semibold">
            ${Number(processingFee).toFixed(2)}
          </span>
        </li>
        <li className="flex justify-between">
          <span>Local Taxes</span>{" "}
          <span className="text-dark font-semibold">
            Calculated at next step
          </span>
        </li>
      </ul>
    </div>
  </div>
);

export default OrderSummary;
