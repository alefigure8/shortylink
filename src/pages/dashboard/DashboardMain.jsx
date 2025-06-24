import "../../styles/pages/dashboard/dashboard.css";
import Spinner from "../../component/spinner/Spinner.jsx";
import useLinks from "../../hooks/useLinks.js";
import LinkForm from "../../component/form/LinkForm.jsx";
import LinkList from "../../component/dashboard/LinkList.jsx";
import { updateLink } from "../../service/linkService";
import useSession from "../../hooks/useSession.js";
import useLinkCreate from "../../hooks/useLinkCreate.js";
import useAnalytics from "../../hooks/useAnalytics.js";
import SuccedLinkCreated from "../../component/alerts/SuccedLinkCreated.jsx";
import ErrorAlert from "../../component/alerts/ErrorAlert.jsx";

function DashboardMain() {
  const { loadingLinks, userLinks, linkById } = useLinks();
  const { response, clearResponse, error, closeError } = useLinkCreate();
  const { session } = useSession();
  const { mainSummary } = useAnalytics();

  function handleTotalVisits() {
    if (userLinks?.email != "") {
      return userLinks?.links?.reduce(
        (accumulator, currentValue) => accumulator + currentValue?.accessCount,
        0
      );
    }
  }

  async function handleToggleActive(link) {
    await updateLink({
      id: link.id,
      originalUrl: link.originalUrl,
      name: link.name,
      isActive: !link.isActive,
      token: session?.token || null,
    });
    if (linkById) linkById(link.id);
    window.location.reload();
  }
  return (
    <>
      {loadingLinks ? (
        <Spinner />
      ) : (
        <div className="dashboard-main-container">
          {/* GRAFICS */}
          <div className="browser-chart">
            {mainSummary?.browserUsages.map((el) => (
              <div>
                <p>Nomnbre: {el?.browserName}</p>
                <p>Clicks: {el?.clicks}</p>
                <p>Porcentaje: {el?.percentage}</p>
              </div>
            ))}
          </div>
          <div className="days-chart">
            {mainSummary?.dailyClicks.map((el) => (
              <div>
                <p>Día: {el?.date}</p>
                <p>Clicks: {el?.clicks}</p>
              </div>
            ))}
          </div>
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
                {mainSummary?.totalClicksInPeriod}
              </div>
            </div>
          </div>
          {/* Create link */}
          <div className="dashboard-create">
            <div className="dashboard-create-content">
              <label>Crear nuevo link:</label>
              <LinkForm />
              {response && (
                <SuccedLinkCreated
                  response={response}
                  onClose={clearResponse}
                />
              )}
              {error && <ErrorAlert error={error} onClose={closeError} />}
            </div>
          </div>
          {/* LINKS */}
          <div className="dashboard-Links-List">
            <label>Urls recientemente creadas</label>
            {userLinks?.totalLinks > 0 ? (
              <LinkList
                userLinks={userLinks}
                onToggleActive={handleToggleActive}
              />
            ) : (
              <p>Aún no hay links. Comience creando uno.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardMain;
