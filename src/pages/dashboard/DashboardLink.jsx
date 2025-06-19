import { useParams, useNavigate } from "react-router-dom";
import useLinks from "../../hooks/useLinks";
import useSession from "../../hooks/useSession";
import { useEffect, useState } from "react";
import Spinner from "../../component/spinner/Spinner";
import "../../styles/pages/dashboard/DashboardLink.css";
import { updateLink } from "../../service/linkService";

function DashboardLink() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { linkById, link, loadingLink, setLoadingLink } = useLinks();
  const { session } = useSession();
  const [modifyLink, setModifyLink] = useState(false);
  const [modifyTitle, setModifyTitle] = useState(false);
  const [dataForm, setDataForm] = useState(null);
  const [message, setMessage] = useState(null);

  // Scroll to top when component mounts or when link changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    linkById(id);
  }, [id, setMessage]);

  useEffect(() => {
    if (link?.shortUrl !== "") {
      setDataForm(link);
      setLoadingLink(false);
    }
  }, [link, setDataForm, setLoadingLink, setMessage]);

  if (loadingLink) {
    return <Spinner />;
  }

  const handleModifyLink = (event) => {
    event.preventDefault();
    setModifyLink(!modifyLink);
  };

  const handleModifyTitle = (event) => {
    event.preventDefault();
    setModifyTitle(!modifyTitle);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateLink({
      id: link.id,
      originalUrl: dataForm.originalUrl,
      name: dataForm.name,
      isActive: link.isActive,
      token: session?.token || null,
    });
    console.log(response);
  };

  const handleInput = (event) => {
    const { id, value } = event.target;
    setDataForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleCancel = (event) => {
    event.preventDefault();

    if (modifyLink || modifyTitle) {
      setModifyLink(false);
      setModifyTitle(false);
      setDataForm(link);
    } else {
      //Delete
      console.log("BOORANDO");
    }
  };

  const handlePause = async (event) => {
    event.preventDefault();
    setLoadingLink(true);
    const response = await updateLink({
      id: link.id,
      originalUrl: link.originalUrl,
      name: link.name,
      isActive: !link.isActive,
      token: session?.token || null,
    });
    setMessage(response);
    setLoadingLink(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="link-container">
        <div className="card-link">
          {/* Header Section */}
          <div className="card-header">
            <div className="header-top">
              <button
                className="back-button"
                onClick={handleGoBack}
                title="Volver atrás"
              >
                <i className="fa-solid fa-arrow-left"></i>
                Volver
              </button>
            </div>
            
            {!modifyTitle ? (
              <div className="card-link-title-row">
                <h1 className="card-link-title">{dataForm?.name}</h1>
                <button
                  className="edit-button"
                  tabIndex={0}
                  title="Editar título"
                  onClick={handleModifyTitle}
                  onKeyPress={e => (e.key === "Enter" ? handleModifyTitle(e) : null)}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
              </div>
            ) : (
              <div className="edit-input-container">
                <input
                  id="name"
                  onChange={handleInput}
                  value={dataForm?.name}
                  autoFocus
                  placeholder="Nombre del enlace"
                />
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="card-separator"></div>

          {/* URLs Section */}
          <div className="card-section">
            <h3 className="section-title">URLs</h3>
            
            <div className="card-item">
              <label>Short URL</label>
              <div className="card-item-value">
                <p>{dataForm?.shortUrl}</p>
                <button className="copy-button" title="Copiar URL corta">
                  <i className="fa-solid fa-copy"></i>
                </button>
              </div>
            </div>

            <div className="card-item">
              <label>Original URL</label>
              {!modifyLink ? (
                <div className="card-item-value">
                  <p>{dataForm?.originalUrl}</p>
                  <button
                    className="edit-button"
                    tabIndex={0}
                    title="Editar URL"
                    onClick={handleModifyLink}
                    onKeyPress={e => (e.key === "Enter" ? handleModifyLink(e) : null)}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                </div>
              ) : (
                <div className="edit-input-container">
                  <input
                    id="originalUrl"
                    onChange={handleInput}
                    value={dataForm?.originalUrl}
                    autoFocus
                    placeholder="URL original"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Separator */}
          <div className="card-separator"></div>

          {/* Statistics Section */}
          <div className="card-section">
            <h3 className="section-title">Estadísticas</h3>
            
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">Clicks</div>
                <div className="stat-value">{dataForm?.accessCount}</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-label">Estado</div>
                <div className={`stat-value status ${dataForm?.isActive ? 'active' : 'paused'}`}>
                  {dataForm?.isActive ? "Activo" : "Pausado"}
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="card-separator"></div>

          {/* Dates Section */}
          <div className="card-section">
            <h3 className="section-title">Fechas</h3>
            
            <div className="card-item">
              <label>Creado</label>
              <p>{new Date(dataForm?.createdAt).toLocaleString(undefined, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}</p>
            </div>

            <div className="card-item">
              <label>Último acceso</label>
              <p>{dataForm?.accessCount > 0
                ? new Date(dataForm?.lastAccessedAt).toLocaleString(undefined, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Nunca"}</p>
            </div>
          </div>

          {/* Separator */}
          <div className="card-separator"></div>

          {/* Actions Section */}
          <div className="card-actions">
            {(modifyLink || modifyTitle) && (
              <button
                className="action-button primary"
                onClick={handleSubmit}
              >
                <i className="fa-solid fa-check"></i>
                Guardar cambios
              </button>
            )}
            
            {!modifyLink && !modifyTitle && (
              <button
                onClick={handlePause}
                className={`action-button ${link.isActive ? 'warning' : 'success'}`}
              >
                <i className={`fa-solid ${link.isActive ? 'fa-pause' : 'fa-play'}`}></i>
                {link.isActive ? "Pausar" : "Activar"}
              </button>
            )}
            
            <button
              onClick={handleCancel}
              className={`action-button ${modifyLink || modifyTitle ? 'secondary' : 'danger'}`}
            >
              <i className={`fa-solid ${modifyLink || modifyTitle ? 'fa-times' : 'fa-trash'}`}></i>
              {modifyLink || modifyTitle ? "Cancelar" : "Eliminar"}
            </button>
          </div>

          {/* Message */}
          {message?.ok && (
            <div className="message success">
              <i className="fa-solid fa-check-circle"></i>
              {message?.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DashboardLink;
