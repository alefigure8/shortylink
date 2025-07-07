import { Link } from "react-router-dom";
import "../../styles/component/pagination.css";

function LinkList({ userLinks, onToggleActive, setPage }) {
  const handlePaginationClick = (event) => {
    event.preventDefault();
    setPage(parseInt(event.target.value));
  };

  const handlePaginationNextPage = (e) => {
    e.preventDefault();
    setPage(
      userLinks?.pageNumber + 1 <= userLinks?.totalPages
        ? userLinks?.pageNumber + 1
        : userLinks?.pageNumber
    );
  };

    const handlePaginationPreviewPage = (e) => {
    e.preventDefault();
    setPage(
      userLinks?.pageNumber - 1 <= userLinks?.totalPages
        ? userLinks?.pageNumber - 1
        : userLinks?.pageNumber
    );
  };

  return (
    <>
      <table className="link-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Url Original</th>
            <th>Url Shrink</th>
            <th>Created</th>
            <th>Visits</th>
            <th>Activo</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userLinks?.items?.map((link) => (
            <tr key={link.id || link.shortUrl}>
              <td title={link?.name != null ? link?.name : "Sin nombre"}>
                {link?.name != null
                  ? link?.name?.length > 10
                    ? link?.name.substr(0, 10) + "..."
                    : link?.name
                  : "-"}
              </td>
              <td title={link?.originalUrl}>
                {link?.originalUrl.length > 25
                  ? link?.originalUrl.substr(0, 25) + "..."
                  : link?.originalUrl}
              </td>
              <td title={link?.shortUrl}>
                {link?.shortUrl.length > 25
                  ? link?.shortUrl.substr(0, 20) + "..."
                  : link?.shortUrl}
              </td>
              <td>
                {new Date(link?.createdAt).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td>{link?.accessCount}</td>
              <td>
                <span
                  className={`switch ${link.isActive ? "active" : "inactive"}`}
                  title={link.isActive ? "Activo" : "Pausado"}
                  onClick={() => onToggleActive && onToggleActive(link)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={link.isActive}
                >
                  <span className="switch-slider"></span>
                </span>
              </td>
              <td>
                <Link to={`/account/${link.id}`} className="link-modify">
                  ...
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination-container">
        <ul className="pagination">
          <li
            className={
              userLinks?.pageNumber === 1 ? "page-item disabled" : "page-item"
            }
            disabled={userLinks?.pageNumber === 1}
          >
            <button
              className="page-link"
              aria-label="Previous"
              onClick={(e => handlePaginationPreviewPage(e))}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          {/* Generate page number buttons */}
          {[...Array(userLinks?.totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                index + 1 === userLinks?.pageNumber ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={(e) => handlePaginationClick(e)}
                value={index + 1}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li
            className={
              userLinks?.pageNumber === userLinks?.totalPages
                ? "page-item disabled"
                : "page-item"
            }
            disabled={userLinks?.pageNumber === userLinks?.totalPages}
          >
            <button
              className="page-link"
              aria-label="Next"
              onClick={e => handlePaginationNextPage(e)}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
        <span className="pagination-info">
          Página {userLinks?.pageNumber} de {userLinks?.totalPages}
        </span>
      </div>
    </>
  );
}

export default LinkList;
