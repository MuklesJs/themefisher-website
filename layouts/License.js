/* eslint-disable react/no-unescaped-entities */
import Base from "@/layouts/Baseof";
import { markdownify } from "@/lib/utils/textConverter";

export const License = ({ licensePage }) => {
  const {
    title,
    description,
    meta_title,
    image,
    noindex,
    chat,
    products,
    users,
    usages,
    allow_list,
    not_allow_list,
  } = licensePage[0].frontmatter;

  function licenseFilter() {
    let user = document.getElementById("user").value;
    let product = document.getElementById("product").value;
    let usages = document.getElementById("usages").value;
    let className = returnClass(user, product, usages);
    let list = document.querySelectorAll(".license-item");
    for (let i = 0; i < list.length; ++i) {
      list[i].classList.remove("d-block");
    }
    let newList = document.querySelectorAll("." + className);
    for (let i = 0; i < newList.length; ++i) {
      newList[i].classList.add("d-block");
    }
  }

  function returnClass(user, product, usages) {
    return (
      user.charAt(0).toString() +
      product.charAt(0).toString() +
      usages.charAt(0).toString()
    );
  }

  return (
    <Base
      title={title}
      meta_title={meta_title}
      description={description}
      image={image}
      noindex={noindex}
      chat={chat}
    >
      <section className="mb-20">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="text-center">
                <h1>{title}</h1>
              </div>
              <div className="col-12 mb-5">
                <div className="rounded-lg shadow p-5 text-center">
                  <p className="h2">
                    I’m A
                    <select
                      id="user"
                      onChange={licenseFilter}
                      className="custom-select-dashed"
                    >
                      {users.map((item, i) => (
                        <option value={item} key={`item-${i}`}>
                          {item}
                        </option>
                      ))}
                    </select>
                    I Want To Use
                    <select
                      id="product"
                      onChange={licenseFilter}
                      className="custom-select-dashed"
                    >
                      {products.map((item, i) => (
                        <option value={item} key={`item-${i}`}>
                          {item}
                        </option>
                      ))}
                    </select>
                    For My
                    <select
                      id="usages"
                      onChange={licenseFilter}
                      className="custom-select-dashed"
                    >
                      {usages.map((item, i) => (
                        <option value={item} key={`item-${i}`}>
                          {item}
                        </option>
                      ))}
                    </select>
                    Project
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="md:col-6">
                  <div className="rounded-3 shadow p-4">
                    <p className="text-center h4">Yes, You are allowed</p>
                    <ul className="check-list">
                      {allow_list.map((item, i) =>
                        markdownify(
                          item.list,
                          "li",
                          `${item.classes} license-item`,
                        ),
                      )}
                    </ul>
                  </div>
                </div>
                <div className="md:col-6">
                  <div className="rounded-3 shadow p-4">
                    <p className="text-center h4">No, You are not allowed</p>
                    <ul className="check-list">
                      {not_allow_list.map((item, i) =>
                        markdownify(
                          item.list,
                          "li",
                          `${item.classes} license-item`,
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
};
