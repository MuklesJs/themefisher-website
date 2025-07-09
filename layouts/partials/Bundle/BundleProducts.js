import ProductCards from "@/components/ProductCards";

const BundleProducts = ({ products }) => {
  return (
    <section className="py-[100px]" id="all-bundle-themes">
      <div className="container">
        <h2 className="text-center mb-5">Access All These Products Instantly</h2>
        <p className="text-center mb-10">
        Get access to all the themes you are seeing here. <br/> Plus, all the future themes we release.
        </p>
        <ProductCards products={products} />
      </div>
    </section>
  );
};

export default BundleProducts;
