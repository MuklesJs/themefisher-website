import Logo from "@/components/Logo";
import OnboardingSelect from "@/components/OnboardingSelect";
import Base from "@/layouts/Baseof";
import { useCartContext } from "context/useCartContext";
import { useOrderContext } from "context/useOrderContext";
import { useUserContext } from "context/useUserContext";
import { useWindowSize } from "hooks/useWindowSize";
import Axios from "lib/axios";
import { getSinglePageServer } from "lib/contentParser";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Confetti from "react-confetti";

const OnboardingPage = ({ questions, session }) => {
  const router = useRouter();
  const isFromCheckout = router.query.purchase;
  const isUpgraded = router.query.upgraded;
  const { width, height } = useWindowSize();
  const { userState } = useUserContext();
  const { orderState } = useOrderContext();
  const { cartDispatch } = useCartContext();
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(
    questions[0].id || 1,
  );
  const [openDropdownId, setOpenDropdownId] = useState(questions[0].id || 1);

  // change cart state after purchase
  useEffect(() => {
    async function clearCart() {
      if (isFromCheckout) {
        clearCart(session, cartDispatch);
      }
    }
    clearCart();
  }, [isFromCheckout, session]);

  function navigateNextQuestion({ values, questionId }) {
    // Filter questions to include only those with ID greater than currentQuestionId
    const nextQuestion = questions.find(
      (question) =>
        question.id > questionId &&
        !(question.exclude && question.exclude.some((v) => values.includes(v))),
    );

    // Return the ID of the next valid question, or null if none is found
    return nextQuestion ? nextQuestion.id : -1;
  }

  const handleOptionChange = ({ selectedValue, questionId }) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [questionId]: selectedValue,
    };

    const updatedOptions = { ...selectedOptions, ...newSelectedOptions };
    Object.keys(updatedOptions).forEach((key) => {
      if (parseInt(key) > questionId) {
        delete updatedOptions[key];
      }
    });

    setSelectedOptions(updatedOptions);
    const values = Object.values(updatedOptions);
    const nextId = navigateNextQuestion({ values, questionId });
    setCurrentQuestionId(nextId);
  };

  // Get the last order of today
  const lastOrderOfToday = useMemo(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const todayPurchase =
      (orderState?.orders?.length > 0 &&
        orderState?.orders?.filter((order) => {
          return order.createdAt.slice(0, 10) === currentDate;
        })) ||
      [];
    const lastPurchase = todayPurchase?.slice(-1);
    return lastPurchase[0];
  }, [orderState?.orders]);

  // handle submit for onboarding and google layer persona
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const submissionData = {};

    // Construct submission data
    Object.entries(selectedOptions).forEach(([questionId, selectedValue]) => {
      const question = questions.find((q) => q.id === parseInt(questionId));
      if (question) {
        submissionData[question.name] = selectedValue;
      }
    });

    const reqBody = { ...submissionData, user_id: userState?.users?.id };

    setLoading(async () => {
      try {
        const personaRes = await Axios.post(`user-persona`, reqBody, {
          headers: {
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        });

        // update order when user upgrade
        if (isUpgraded === "true") {
          const orderId = lastOrderOfToday?.order_id;
          await Axios.patch(`order/upgraded`, {
            order_id: orderId,
            headers: {
              authorization: `Bearer ${session?.user?.accessToken}`,
            },
          });
        }

        if (personaRes.status === 200) {
          router.push("/dashboard/downloads");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        if (
          error?.response?.status === 401 ||
          error?.response?.data?.message === "jwt expired"
        ) {
          signOut();
        }
      }
    });
  };

  // Google Analytics data layer
  useEffect(() => {
    if (isFromCheckout && lastOrderOfToday) {
      window.dataLayer = [
        {
          event: "purchase",
          ecommerce: {
            transaction_id: lastOrderOfToday?.checkout_id,
            value: lastOrderOfToday?.earnings,
            currency: "USD",
            items: [
              {
                item_name: lastOrderOfToday?.products[0]?.slug,
              },
            ],
          },
        },
      ];
    }
  }, [lastOrderOfToday, isFromCheckout]);

  const renderQuestion = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    const options = question?.options;

    const isVisible =
      currentQuestionId === questionId ||
      selectedOptions[questionId] !== undefined;
    const isDropdownOpen = openDropdownId === questionId;

    const handleToggleDropdown = (option) => {
      const nextId = navigateNextQuestion({
        values: Object.values(selectedOptions),
        questionId,
      });
      setOpenDropdownId(isDropdownOpen ? (option ? nextId : null) : questionId);
    };

    if (!question) return null;

    const questionParts = question.question.split("<COMPONENT>");
    const selectComponent =
      question.field === "input" ? (
        <input
          type={question.type}
          className="form-input w-auto"
          name={question.name}
          placeholder="https://example.com"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleOptionChange({ questionId, selectedValue: e.target.value });
              handleToggleDropdown(e.target.value);
            }
          }}
        />
      ) : (
        <OnboardingSelect
          className={question.className}
          options={options}
          onSelect={(option) =>
            handleOptionChange({ questionId, selectedValue: option })
          }
          isDropdownOpen={isDropdownOpen}
          onToggle={handleToggleDropdown}
        />
      );

    return (
      isVisible && (
        <div key={questionId} className="items-center space-x-5">
          <div className="flex items-center space-x-5">
            <div>
              <span className="text-lg font-medium text-dark inline-block">
                {questionParts[0]}
              </span>{" "}
              {selectComponent}{" "}
              <span className="text-lg font-medium text-dark">
                {questionParts[1]}
              </span>
            </div>
          </div>
        </div>
      )
    );
  };

  const isEndOfQuestions = currentQuestionId === -1 || currentQuestionId === 8;

  return (
    <Base title={"Onboarding - Themefisher"} noindex={true}>
      <section className="fixed section top-0 left-0 right-0 bottom-0 bg-white z-[99999] h-screen overflow-auto">
        <div className="container">
          <Confetti
            recycle={false}
            opacity={0.5}
            numberOfPieces={500}
            tweenDuration={3000}
            width={width}
            height={height}
          />
          <div className="row">
            <div className="lg:col-6 mx-auto">
              <div className="mb-14">
                <Logo />
              </div>
              <p className="text-lg mb-3">
                Hi, {session?.user.first_name}
                <Image
                  src="/images/wave.webp"
                  width={20}
                  height={20}
                  alt="wave"
                  className="inline-block wave-img ml-2"
                />
              </p>
              <h2 className="mb-2">
                {isFromCheckout
                  ? "Thank you for your purchase!"
                  : "Welcome to Themefisher!"}
              </h2>
              <p className="mb-8">
                Let's help you get started & personalize your experience by
                answering a few quick questions.
              </p>
              {/* <p>
              Step {currentQuestionId} of {questions?.length}
            </p> */}
              <div className="space-x-2 flex *:flex-1 mt-8">
                {[...Array(questions.length)].map((_, index) => (
                  <span
                    key={index}
                    className={`${index < currentQuestionId ? "bg-primary" : "bg-gray-300"} h-1.5 rounded inline-block`}
                  />
                ))}
              </div>

              <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
                {questions?.map((question) => renderQuestion(question.id))}

                {/* Render submit button when no more questions to navigate */}
                {isEndOfQuestions && (
                  <div>
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary mt-8 inline-block"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          Submitting
                          <svg
                            height="25"
                            width="25"
                            className="ml-2"
                            viewBox="0 0 100 100"
                          >
                            <path
                              fill="#fff"
                              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                            >
                              <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="rotate"
                                dur="1s"
                                from="0 50 50"
                                to="360 50 50"
                                repeatCount="indefinite"
                              />
                            </path>
                          </svg>
                        </>
                      ) : (
                        "Submit & Go To Dashboard"
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default OnboardingPage;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  // get question data from content/sections/question.md
  const getQuestions = await getSinglePageServer(
    "content/landing-pages",
    "onboarding",
  );

  const questions = getQuestions?.frontmatter.questions;
  const userPersona = await Axios.get(
    `user-persona/public/${session?.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    },
  );

  if (userPersona.data.result?.user_id) {
    return {
      redirect: {
        destination: "/dashboard/downloads?purchase=true",
        permanent: false,
      },
    };
  }

  return {
    props: { session, questions },
  };
};
