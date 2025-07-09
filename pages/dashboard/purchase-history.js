import Loader from "@/components/Loader";
import Status from "@/components/Status";
import { useOrderContext } from "@/context/useOrderContext";
import Base from "@/layouts/Baseof";
import { dateFormat } from "lib/utils/dateFormat";
import { getSession } from "next-auth/react";

const PurchaseHistory = () => {
  const { orderState } = useOrderContext();
  const { success, orders } = orderState;

  return (
    <Base title="Purchase History" chat={true}>
      <section className="section-sm">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="h2 mb-3">Purchase History</h1>
            <p className="text-[#888]">
              View your Purchase, Dates, payment Information and Invoices.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-8">
            {!success && <Loader />}
            {success && orders.length === 0 && (
              <div className="text-center">
                <h3>You have no purchase history</h3>
              </div>
            )}
            {success && orders.length > 0 && (
              <div className="overflow-auto">
                <table className="min-w-full table-auto border-separate border-spacing-y-5">
                  <thead className="mb-3">
                    <tr className="bg-theme-light px-4 py-3">
                      <th className="py-3 px-6 text-dark text-left rounded-l">
                        Order ID
                      </th>
                      <th className="py-3 px-6 text-dark">Products</th>
                      <th className="py-3 px-6 text-dark">Amount</th>
                      <th className="py-3 px-6 text-dark">Date</th>
                      <th className="py-3 px-6 text-dark">Status</th>
                      <th className="py-3 px-6 text-dark text-right rounded-r">
                        Invoice
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((data) => (
                      <tr key={data.order_id}>
                        <td className="text-sm px-4 py-3 text-left">
                          #{data.order_id}
                        </td>
                        <td className="text-sm px-4 py-3 text-center">
                          {data?.products?.length > 0 &&
                            data?.products?.map((product) => (
                              <span className="capitalize" key={product.slug}>
                                {product.slug}{" "}
                              </span>
                            ))}
                        </td>
                        <td className="text-sm px-4 py-3 text-center">
                          ${parseFloat(data.total).toFixed(2)}
                        </td>
                        <td className="text-sm px-4 py-3 text-center">
                          {dateFormat(data.createdAt)}
                        </td>
                        <td className="text-sm px-4 py-3 text-center">
                          <Status
                            status={
                              data.status === "refunded" ? "Refunded" : "Paid"
                            }
                            type={
                              data.status === "refunded" ? "error" : "success"
                            }
                          />
                        </td>
                        <td className="text-sm px-4 py-3 text-right">
                          <a
                            target="_blank"
                            className="btn btn-sm btn-primary"
                            href={data.receipt_url}
                          >
                            View Invoice
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </Base>
  );
};

export default PurchaseHistory;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login?callbackUrl=" + context.resolvedUrl,
        permanent: false,
      },
    };
  }
  return {
    props: {
      session: session,
    },
  };
};
