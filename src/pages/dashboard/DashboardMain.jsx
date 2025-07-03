import "../../styles/pages/dashboard/dashboard.css";
import Spinner from "../../component/spinner/Spinner.jsx";
import useLinks from "../../hooks/useLinks.js";
import LinkForm from "../../component/form/LinkForm.jsx";
import LinkList from "../../component/dashboard/LinkList.jsx";
import { updateLink } from "../../service/linkService";
import useSession from "../../hooks/useSession.js";
import useLinkCreate from "../../hooks/useLinkCreate.js";
import SuccedLinkCreated from "../../component/alerts/SuccedLinkCreated.jsx";
import ErrorAlert from "../../component/alerts/ErrorAlert.jsx";
import useAnalytics from "../../hooks/useAnalytics.js";
import { useEffect } from "react";
import useLoading from "../../hooks/useLoading.js";

function DashboardMain() {
  const { userLinks, linkById } = useLinks();
  const { response, clearResponse, error, closeError } = useLinkCreate();
  const { session } = useSession();
  const { mainSummary, analyticsFetch } = useAnalytics();
  const { isLoading } = useLoading();

  useEffect(() => {
    const fetch = async () => await analyticsFetch();
    fetch();
  }, [analyticsFetch]);

  async function handleToggleActive(link) {
    await updateLink({
      id: link.id,
      originalUrl: link.originalUrl,
      name: link.name,
      password: link.password,
      isActive: !link.isActive,
      token: session?.token || null,
    });
    if (linkById) linkById(link.id);
    window.location.reload();
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
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
              {mainSummary?.totalClicks}
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
              <SuccedLinkCreated response={response} onClose={clearResponse} />
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
    </>
  );
}

export default DashboardMain;
