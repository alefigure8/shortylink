import { Link } from "react-router-dom";

function LinkList({userLinks}) {
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
                {link?.isActive ? (
                  <i className="fa-solid fa-check success-colortext"></i>
                ) : (
                  <i className="fa-solid fa-xmark error-colortext"></i>
                )}
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
