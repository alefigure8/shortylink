import "../../styles/pages/dashboard/dashboard.css";
import Spinner from "../../component/spinner/Spinner.jsx";
import useLinks from "../../hooks/useLinks.js";
import { Link } from "react-router-dom";
import LinkForm from "../../component/form/LinkForm.jsx";

function DashboardMain() {
  const { loadingLinks, userLinks } = useLinks();

  function handleTotalVisits() {
    if (userLinks?.email != "") {
      return userLinks?.links?.reduce(
        (accumulator, currentValue) => accumulator + currentValue?.accessCount,
        0
      );
    }
  }

function handleUltimosDias() {
  if (userLinks?.email !== "") {
    const ahora = Date.now();
    const treintaDiasEnMs = 30 * 24 * 60 * 60 * 1000;

    return userLinks?.links?.reduce((accumulator, currentValue) => {
      const lastAccess = new Date(currentValue?.lastAccessedAt).getTime();
      if (!isNaN(lastAccess) && ahora - lastAccess <= treintaDiasEnMs) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
  }
  return 0; // o null, según tu lógica
}

  return (
    <>
      {loadingLinks ? (
        <Spinner />
      ) : (
        <div className="dashboard-main-container">
          {/* CARDS */}
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <div className="dashboard-card-title">Links</div>
              <div className="dashboard-card-content">
                {userLinks?.totalLinks}
              </div>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-card-title">Clicks totales</div>
              <div className="dashboard-card-content">
                {handleTotalVisits()}
              </div>
            </div>
             <div className="dashboard-card">
              <div className="dashboard-card-title">Últimos 30 días</div>
              <div className="dashboard-card-content">
                {handleUltimosDias()}
              </div>
            </div>
          </div>
          {/* Create link */}
          <div className="dashboard-create">
            <div className="dashboard-create-content">
              <label>Crear nuevo link:</label>
              <LinkForm />
            </div>
          </div>
          {/* LINKS */}
          <div className="dashboard-Links-List">
            <label>Urls recientemente creadas</label>
            <table className="link-table">
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
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardMain;
