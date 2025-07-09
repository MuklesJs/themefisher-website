import Loader from "@/components/Loader";
import Status from "@/components/Status";
import TicketForm from "@/components/TicketForm";
import TicketSingle from "@/components/TicketSingle";
import axios from "axios";
import Base from "layouts/Baseof";
import { dateFormat } from "lib/utils/dateFormat";
import { heroId } from "lib/utils/supportHero";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const Tickets = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [allTickets, setAllTickets] = useState([]);
  const [filterTickets, setFilterTickets] = useState([]);
  const [activeButton, setActiveButton] = useState("all");
  const [loadTickets, setLoadTickets] = useState(false);

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Td-Organization-Slug": process.env.NEXT_PUBLIC_THRIVEDESK_SLUG,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_THRIVEDESK_API_KEY}`,
  };

  useEffect(() => {
    !router.query.new && setLoadTickets(true);
    const thriveDeskData = async () => {
      try {
        const res = await axios.get(
          `https://api.thrivedesk.com/v1/customer/conversations?customer_email=${session.user.email}`,
          {
            headers: headers,
          },
        );
        const filterByInbox = res.data.data.filter(
          (item) => item.inbox_id === process.env.NEXT_PUBLIC_THRIVEDESK_SLUG,
        );
        setAllTickets(filterByInbox);
        setFilterTickets(filterByInbox);
        setLoadTickets(false);
      } catch (error) {
        setLoadTickets(false);
        console.error("Error fetching ThriveDesk data:", error);
        // Handle the error here (e.g., show an error message to the user)
      }
    };
    session && thriveDeskData();
  }, [router.query.refresh]);

  const closedTickets = useMemo(() => {
    const data = allTickets?.filter((item) => item.status === "Closed");
    return data;
  }, [allTickets]);

  const openTickets = useMemo(() => {
    const data = allTickets?.filter((item) => item.status === "Active");
    return data;
  }, [allTickets]);

  const singleTicket = useMemo(() => {
    const data = allTickets?.find((item) => item.ticket_id == router.query.id);
    return data;
  }, [router.query.id, allTickets]);

  const filterTicketsHandler = (type) => {
    if (type === "closed") {
      setFilterTickets(closedTickets);
      setActiveButton("closed");
    } else if (type === "open") {
      setFilterTickets(openTickets);
      setActiveButton("open");
    } else {
      setFilterTickets(allTickets);
      setActiveButton("all");
    }
  };

  return (
    <Base title="Support Tickets" chat={false}>
      <section className="section-sm">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="h2 mb-3">Support Tickets</h1>
            <p className="text-[#888]">
              Contact with Support agents & view all support history
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-8">
            {loadTickets ? (
              <Loader />
            ) : router.query?.new ? (
              <TicketForm />
            ) : router.query?.id ? (
              <TicketSingle data={singleTicket} headers={headers} />
            ) : allTickets?.length > 0 ? (
              <>
                {/* filter tickets */}
                <div className="flex items-center justify-between mb-6">
                  <ul className="flex bg-theme-light rounded p-1">
                    <li>
                      <button
                        onClick={() => filterTicketsHandler("all")}
                        className={`px-3 py-2 rounded font-semibold ${
                          activeButton === "all" && "bg-white text-dark"
                        }`}
                      >
                        All
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => filterTicketsHandler("open")}
                        className={`px-3 py-2 rounded font-semibold ${
                          activeButton === "open" && "bg-white text-dark"
                        }`}
                      >
                        Active
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => filterTicketsHandler("closed")}
                        className={`px-3 py-2 rounded font-semibold ${
                          activeButton === "closed" && "bg-white text-dark"
                        }`}
                      >
                        Closed
                      </button>
                    </li>
                  </ul>
                  <Link
                    className={`btn btn-primary`}
                    href={`/dashboard/tickets?new=true`}
                  >
                    Create New Ticket
                  </Link>
                </div>
                {/* tickets list */}
                <div className="overflow-auto">
                  <table className="min-w-full table-auto border-separate border-spacing-y-5">
                    <thead className="mb-3">
                      <tr className="bg-theme-light px-4 py-3">
                        <th className="py-3 px-6 text-dark text-left rounded-l">
                          Subject
                        </th>
                        <th className="py-3 px-6 text-dark">Support Hero</th>
                        <th className="py-3 px-6 text-dark">Date</th>
                        <th className="py-3 px-6 text-dark rounded-r">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterTickets?.map((data) => (
                        <tr key={data.ticket_id}>
                          <td className="text-sm px-4 py-3 text-left">
                            <Link
                              href={`/dashboard/tickets?id=${data.ticket_id}`}
                            >
                              {data.subject}
                            </Link>
                          </td>
                          <td className="text-sm px-4 py-3 text-center flex items-center justify-center">
                            {data.assignable_id ? (
                              <>
                                <Image
                                  className="rounded-full border-2 border-border mr-2"
                                  src={`/images/support-team/${heroId(
                                    data.assignable_id,
                                  )}.png`}
                                  width={24}
                                  height={24}
                                  alt={heroId(data.assignable_id)}
                                />
                                <span className="capitalize">
                                  {heroId(data.assignable_id)}
                                </span>
                              </>
                            ) : (
                              <span className="text-light">
                                Not Assigned Yet
                              </span>
                            )}
                          </td>
                          <td className="text-sm px-4 py-3 text-center">
                            {dateFormat(data.created_at)}
                          </td>
                          <td className="text-sm px-4 py-3 text-center">
                            <Status
                              status={data.status}
                              type={
                                data.status === "Active" ? "success" : "error"
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : router.query?.created && allTickets?.length === 0 ? (
              <Loader />
            ) : (
              // Empty Tickets
              <div className="text-center p-10">
                <Image
                  src="/images/empty-tickets.svg"
                  width={100}
                  height={117}
                  alt="empty"
                  className="mb-4 text-center mx-auto"
                />
                <h4 className="h4 mb-4">No Tickets Found</h4>
                <p className="text-light max-w-[400px] mx-auto mb-5">
                  You Have Not Created Any Tickets Yet. To Create a New Ticket
                  Click The Button Below
                </p>
                <Link
                  className="btn btn-primary btn-sm"
                  href={`/dashboard/tickets?new=true`}
                >
                  Create New Ticket
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Tickets;

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
