import { useParams } from "react-router-dom";
import useLinks from "../../hooks/useLinks";
import { useEffect } from "react";
import Spinner from "../../component/spinner/Spinner";
import "../../styles/pages/dashboard/DashboardLink.css";

function DashboardLink() {
  const { id } = useParams();
  const { linkById, link, loadingLink } = useLinks();

  useEffect(() => {
    linkById(id);
  }, []);

  if (loadingLink) {
    return <Spinner />;
  }

  return (
    <>
      <div className="link-container">
        <div className="card-link">
          <h1 className="card-link-title">{link?.name}</h1>
          <div className="card-item">
            <label>Short URL</label>
            <p>{link?.shortUrl}</p>
          </div>
          <div className="card-item">
            <label>Short URL: </label>
            <p>{link?.originalUrl}</p>
          </div>
          <div className="card-item">
            <label>Clicks: </label>
            <p>{link?.accessCount}</p>
          </div>
          <div className="card-item">
            <label>Created At: </label>
            <p>
              {new Date(link?.createdAt).toLocaleString(undefined, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="card-item">
            <label>Last Access: </label>
            <p>
              {new Date(link?.lastAccessedAt).toLocaleString(undefined, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="card-buttons">
            <button className="card-button-modify">Modificar</button>
            <button className="card-button-pause">Pausar</button>
            <button className="card-button-delete">Eliminar</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLink;
