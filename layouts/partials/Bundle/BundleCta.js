import Link from "next/link";

const BundleCta = ({
  call_to_action: { title, description },
  button: { label, link },
}) => {
  return (
    <section className="pt-0 section text-center">
      <div className="container">
        <div className="row">
          <div className="mx-auto xl:col-8 lg:col-10">
            <h2>{title}</h2>
            <p className="mt-6">{description}</p>

            <div className="mt-8">
              <Link href={link} className="btn btn-cta">
                {label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BundleCta;
