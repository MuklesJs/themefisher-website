import Link from "next/link";

const Pagination = ({ section, currentPage, totalPages }) => {
  const indexPageLink = currentPage === 2;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;
  let pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }

  return (
    <>
      {totalPages > 1 && (
        <nav className="pagination-nav mt-8 pt-6" aria-label="Pagination">
          <ul className="page-numbers">
            {/* previous */}
            {hasPrevPage && (
              <li>
                <Link
                  href={
                    indexPageLink
                      ? `${section ? "/" + section : "/"}`
                      : `${section ? "/" + section : ""}/page/${
                          currentPage - 1
                        }`
                  }
                >
                  Prev
                </Link>
              </li>
            )}

            {/* page index */}
            {pageList.map((pagination, i) => (
              <li key={`page-${i}`}>
                {pagination === currentPage ? (
                  <span className="active">{pagination}</span>
                ) : (
                  <Link
                    href={
                      i === 0
                        ? `${section ? "/" + section : "/"}`
                        : `${section ? "/" + section : ""}/page/${pagination}`
                    }
                  >
                    {pagination}
                  </Link>
                )}
              </li>
            ))}

            {/* next page */}
            {hasNextPage && (
              <li>
                <Link
                  href={`${section ? "/" + section : ""}/page/${
                    currentPage + 1
                  }`}
                >
                  Next
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Pagination;
