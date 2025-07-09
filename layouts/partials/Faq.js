import { markdownify } from "@/lib/utils/textConverter";

const Faq = ({ faq: { questions, title, enable }, className }) => {
  return (
    <>
      {enable && (
        <div className={`section ${className}`}>
          <div className="container">
            <div className="row">
              <div className="md:col-12 mb-12 text-center">
                <h2>{title}</h2>
              </div>

              {questions.map((question, i) => (
                <div
                  className="md:col-6 mb-10  faq-panel"
                  key={`question-${i}`}
                >
                  <h6 className="mb-2 font-primary">{question.question}</h6>

                  {markdownify(question.answer, "div", "faq-panel-body")}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Faq;
