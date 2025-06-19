import { Link } from "react-router-dom";

function LinkList({userLinks, onToggleActive}) {
  return (
    <>
      <table className="link-table" >
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
          {userLinks?.links?.map((link) => (
            <tr key={link.id || link.shortUrl}>
              <td>{link?.name}</td>
              <td>{link?.originalUrl}</td>
              <td>{link?.shortUrl}</td>
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
    </>
  );
}

export default LinkList;
