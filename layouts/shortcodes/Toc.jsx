const Toc = ({ level }) => {
  let h2 = false;
  let h3 = false;
  let h4 = false;

  if (level) {
    if (level.includes("h2")) {
      h2 = true;
    }
    if (level.includes("h3")) {
      h3 = true;
    }
    if (level.includes("h4")) {
      h4 = true;
    }
  }

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `
          <style>
            nav.toc {
              display: block !important;
              position: absolute;
              top: 0;
              right: calc( 100% + 20px );
              height: 100%;
              width: 230px;
              z-index: 9996;
              user-select: none;
            }
            @media (max-width: 1280px) {
              nav.toc {
                position: static;
                width: 100%;
                margin-bottom: 40px;
              }
            }

            nav.toc>ol {
              padding: 15px;
              padding-bottom: 4px;
              margin-bottom: 0;
              box-shadow: 0 5px 16px #eee;
              border-radius: 6px;
              overflow-y: auto;
              background: white;
              position: sticky;
              top: 50px;
              max-height: 500px;
            }
            @media (max-width: 885px) {
              nav.toc>ol {
                max-height: 185px;
                margin-bottom: 30px;
              }
            }

            nav.toc>ol::before {
              content: "Table of Contents";
              font-family: 'recoleta';
              color: black;
              margin-bottom: 13px;
              display: block;
              letter-spacing: .03em;
              font-size: 20px;
            }

            nav.toc ol {
              list-style: none;
            }

            nav.toc ol > li {
              margin-bottom: 12px;
            }

            nav.toc ol li a {
              font-size: 13px;
              line-height: 1.4;
              margin-bottom: 12px;
              color: #555 !important;
              text-transform: capitalize;
              position: relative;
              padding-left: 15px;
            }
            nav.toc ol li a::before {
              content: "#";
              position: absolute;
              left: 0;
              font-size: 11px;
              top: 2px;
              color: #4ea8b9;
              opacity: .6;
            }

            nav.toc ol li a.active,
            nav.toc ol li a:hover,
            nav.toc ol li a:focus {
              color: #4ea8b9 !important;
            }

            nav.toc ol ol {
              padding-left: .6rem;
              border-left: 1px solid #eee;
            }

            .toc-link-h2 {
              display: none;
            }

            .toc-link-h3 {
              display: none;
            }

            .toc-link-h4 {
              display: none;
            }
          </style>
          `,
        }}
      />

      {/* if h2 */}
      {level && h2 && (
        <div
          dangerouslySetInnerHTML={{
            __html: `
          <style>
          .toc-link-h2 {
            display: block !important;
          }
          </style>
          `,
          }}
        />
      )}

      {/* if h3 */}
      {level && h3 && (
        <div
          dangerouslySetInnerHTML={{
            __html: `
          <style>
          .toc-link-h3 {
            display: block !important;
          }
          </style>
          `,
          }}
        />
      )}

      {/* if h4 */}
      {level && h4 && (
        <div
          dangerouslySetInnerHTML={{
            __html: `
          <style>
          .toc-link-h4 {
            display: block !important;
          }
          </style>
          `,
          }}
        />
      )}

      {/* if not anything */}
      {level === undefined && (
        <div
          dangerouslySetInnerHTML={{
            __html: `
          <style>
          .toc-link-h2 {
            display: block !important;
          }
          </style>
          `,
          }}
        />
      )}
    </>
  );
};

export default Toc;
