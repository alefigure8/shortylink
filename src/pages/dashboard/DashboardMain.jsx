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

  return (
    <>
      {loadingLinks ? (
        <Spinner />
      ) : (
        <div className="dashboard-main-container">
          {/* CARDS */}
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <div className="dashboard-card-title">Link</div>
              <div className="dashboard-card-content">
                {userLinks?.totalLinks}
              </div>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-card-title">Visitas</div>
              <div className="dashboard-card-content">
                {handleTotalVisits()}
              </div>
            </div>
          </div>
          {/* Create link */}
          <div className="dashboard-create">
            <LinkForm />
          </div>
          {/* LINKS */}
          <div className="dashboard-Links-List">
            <h3>Urls recientemente creadas</h3>
            <table className="link-table">
              <thead>
                <tr>
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
                    <td>{link?.originalUrl}</td>
                    <td>{link?.shortUrl}</td>
                    <td>{link?.createdAt}</td>
                    <td>{link?.accessCount}</td>
                    <td>{link?.isActive ? "Activo" : "No Activo"}</td>
                    <td><Link to={`/account/${link.id}`} className="link-modify">...</Link></td>
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
