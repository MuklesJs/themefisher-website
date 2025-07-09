import ContactForm from "@/components/ContactForm";
import Base from "@/layouts/Baseof";
import { markdownify, plainify } from "@/lib/utils/textConverter";
import { getListPage } from "lib/contentParser";

const ContactPage = ({ contactPage: { frontmatter, content } }) => {
  const { title, meta_title, image, description, noindex, service_popup } =
    frontmatter;

  return (
    <Base
      title={title}
      meta_title={meta_title}
      description={description ? description : plainify(content.slice(0, 120))}
      image={image}
      noindex={noindex}
      service_popup={service_popup}
    >
      <section className="section pt-[50px]">
        <div className="container">
          <div className="row justify-center">
            <div className="xl:col-8 lg:col-10">
              <div className="mb-8 text-center">
                <h1 className="mb-4">{title}</h1>
                {markdownify(content, "div", "content")}
              </div>
              <div className="shadow p-8 rounded-lg">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default ContactPage;

export const getStaticProps = async () => {
  const contactPage = await getListPage("content/landing-pages/contact.md");

  return {
    props: {
      contactPage: contactPage,
    },
  };
};
