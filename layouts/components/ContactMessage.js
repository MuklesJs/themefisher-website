/* eslint-disable react/no-unescaped-entities */
import { markdownify } from "@/lib/utils/textConverter";

const ContactMessage = ({ success_message }) => {
  return (
    <div>
      {markdownify(success_message, "p", "")}
      <button
        onClick={() => window.location.reload()}
        className="btn btn-sm btn-primary mt-5"
      >
        Submit another response
      </button>
    </div>
  );
};

export default ContactMessage;
