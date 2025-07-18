import useLinks from "../../hooks/useLinks";
import useAnalytics from "../../hooks/useAnalytics";
import useSession from "../../hooks/useSession";
import { useEffect, useState } from "react";
import Spinner from "../../component/spinner/Spinner";
import "../../styles/pages/dashboard/DashboardLink.css";
import { updateLink, deleteLink } from "../../service/linkService";
import { useParams } from "react-router-dom";
import AreaChartAnalyticLink from "../../component/dashboard/AreaChartAnalyticLink";
import useLoading from "../../hooks/useLoading";
import useMessage from "../../hooks/useMessage";
import ConfirmAlert from "../../component/alerts/ConfirmAlert";

function DashboardLink() {
  const { id } = useParams();
  const { linkById, link } = useLinks();
  const { session } = useSession();
  const [modifyLink, setModifyLink] = useState(false);
  const [modifyTitle, setModifyTitle] = useState(false);
  const [modifyPass, setModifyPass] = useState(false);
  const [dataForm, setDataForm] = useState(null);
  const { clickLink, analyticsByIdFetch } = useAnalytics();
  const { isLoading } = useLoading();
  const { showMessage } = useMessage();
  const [confirmAlertDelete, setConfirmAlertDelete] = useState(false);
  const [confirmAlertPause, setConfirmAlertPause] = useState(false);

  // Llamdos fetch a información y analiticas del link
  useEffect(() => {
    const fetchData = async () => {
      await analyticsByIdFetch(id);
      await linkById(id);
    };
    fetchData();
  }, [id]);

  // Update información
  useEffect(() => {
    if (link?.shortUrl !== "") {
      link.password = "";
      setDataForm(link);
    }
  }, [link, setDataForm]);

  // --- LOADING ---
  if (isLoading) {
    return <Spinner />;
  }

  // --- DELETE LINK ----
  const onConfirmDelete = async (response) => {
    if (response) {
      setConfirmAlertDelete(false);
      await deleteLink(id, session);
      handleGoBack();
    } else {
      setConfirmAlertDelete(false);
    }
  };

  const onConfirmPause = async (response) => {
    if (response) {
      try {
        const response = await updateLink({
          id: link.id,
          originalUrl: link.originalUrl,
          name: link.name,
          isActive: !link.isActive,
          token: session?.token || null,
        });
        await linkById(id);
        showMessage(response.message)
      } catch (error) {
        showMessage(error.message, "error");
      }
      setConfirmAlertPause(false);
    } else {
      setConfirmAlertPause(false);
    }
  };

  /// --- MODIFICAR LINK ---
  const handleModifyLink = (event) => {
    event.preventDefault();
    setModifyLink(!modifyLink);
  };

  const handleModifyTitle = (event) => {
    event.preventDefault();
    setModifyTitle(!modifyTitle);
  };

  const handleModifyPass = (event) => {
    event.preventDefault();
    setModifyPass(!modifyPass);
  };

  // --- SUBMIT FORM ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateLink({
        id: link.id,
        originalUrl: dataForm.originalUrl,
        name: dataForm.name,
        password: dataForm.password,
        isActive: link.isActive,
        token: session?.token || null,
      });
      await linkById(id);
      setModifyLink(false);
      setModifyTitle(false);
      setModifyPass(false);
      showMessage("Modificado exitosamente");
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  // --- HANDLE INPUT ---
  const handleInput = (event) => {
    const { id, value } = event.target;
    setDataForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  // --- CANCELAMOS EDICION O ABRIMOS CONFIRMACION PARA DELETE DE LINK ---
  const handleCancel = async (event) => {
    event.preventDefault();

    if (modifyLink || modifyTitle || modifyPass) {
      setModifyLink(false);
      setModifyTitle(false);
      setModifyPass(false);
      setDataForm(link);
    } else {
      setConfirmAlertDelete(true);
    }
  };

  // --- PAUSAMOS EL LINK ---
  const handlePause = async (event) => {
    event.preventDefault();
    setConfirmAlertPause(true);
  };

  // --- GO BACK ---
  const handleGoBack = () => {
    window.location.replace("/account");
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
                  onKeyPress={(e) =>
                    e.key === "Enter" ? handleModifyTitle(e) : null
                  }
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
                    onKeyPress={(e) =>
                      e.key === "Enter" ? handleModifyLink(e) : null
                    }
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

            <div className="card-item">
              {!modifyPass ? (
                <div className="card-item-value">
                  <button
                    className="edit-button"
                    title="Cambiar password"
                    onClick={handleModifyPass}
                    onKeyPress={(e) =>
                      e.key === "Enter" ? handleModifyPass(e) : null
                    }
                  >
                    {dataForm?.hasPassword
                      ? "Modificar Password"
                      : "Agregar Password"}
                  </button>
                </div>
              ) : (
                <div className="edit-input-container">
                  <input
                    type="password"
                    id="password"
                    onChange={handleInput}
                    value={dataForm?.password}
                    autoFocus
                    placeholder="Modificar Password"
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
                <div
                  className={`stat-value status ${
                    dataForm?.isActive ? "active" : "paused"
                  }`}
                >
                  {dataForm?.isActive ? "Activo" : "Pausado"}
                </div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Clicks últimos 30 días</div>
              <AreaChartAnalyticLink dataForm={clickLink} />
            </div>
          </div>

          {/* Separator */}
          <div className="card-separator"></div>

          {/* Dates Section */}
          <div className="card-section">
            <h3 className="section-title">Fechas</h3>

            <div className="card-item">
              <label>Creado</label>
              <p>
                {new Date(dataForm?.createdAt).toLocaleString(undefined, {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="card-item">
              <label>Último acceso</label>
              <p>
                {dataForm?.accessCount > 0
                  ? new Date(dataForm?.lastAccessedAt).toLocaleString(
                      undefined,
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                  : "Nunca"}
              </p>
            </div>
          </div>

          {/* Separator */}
          <div className="card-separator"></div>

          {/* Actions Section */}
          <div className="card-actions">
            {(modifyLink || modifyTitle || modifyPass) && (
              <button className="action-button primary" onClick={handleSubmit}>
                <i className="fa-solid fa-check"></i>
                Guardar cambios
              </button>
            )}

            {!modifyLink && !modifyTitle && !modifyPass && (
              <button
                onClick={handlePause}
                className={`action-button ${
                  link.isActive ? "warning" : "success"
                }`}
              >
                <i
                  className={`fa-solid ${
                    link.isActive ? "fa-pause" : "fa-play"
                  }`}
                ></i>
                {link.isActive ? "Pausar" : "Activar"}
              </button>
            )}

            <button
              onClick={handleCancel}
              className={`action-button ${
                modifyLink || modifyTitle || modifyPass ? "secondary" : "danger"
              }`}
            >
              <i
                className={`fa-solid ${
                  modifyLink || modifyTitle || modifyPass
                    ? "fa-times"
                    : "fa-trash"
                }`}
              ></i>
              {modifyLink || modifyTitle || modifyPass
                ? "Cancelar"
                : "Eliminar"}
            </button>
          </div>
        </div>
      </div>
      {confirmAlertDelete && (
        <ConfirmAlert
          text={"¿Seguro desea borrar el link?"}
          type={"warning"}
          onConfirm={onConfirmDelete}
        />
      )}
      {confirmAlertPause&& (
        <ConfirmAlert
          text={dataForm?.isActive
            ? "¿Seguro desea pausar el link?"
            : "¿Seguro desea activar el link?"}
          type={"warning"}
          onConfirm={onConfirmPause}
        />
      )}
    </>
  );
}

export default DashboardLink;
