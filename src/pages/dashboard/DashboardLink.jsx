import { useParams } from "react-router-dom";
import useLinks from "../../hooks/useLinks";
import useSession from "../../hooks/useSession";
import { useEffect, useState } from "react";
import Spinner from "../../component/spinner/Spinner";
import "../../styles/pages/dashboard/DashboardLink.css";
import { updateLink } from "../../service/linkService";

function DashboardLink() {
  const { id } = useParams();
  const { linkById, link, loadingLink, setLoadingLink } = useLinks();
  const { session } = useSession();
  const [modifyLink, setModifyLink] = useState(false);
  const [modifyTitle, setModifyTitle] = useState(false);
  const [dataForm, setDataForm] = useState(null);
  const [message, setMessage] = useState(null);

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

  return (
    <>
            <div className="link-container">
        <div className="card-link">
          {!modifyTitle ? (
            <div className="card-link-title-row">
              <h1 className="card-link-title">{dataForm?.name}</h1>
              <i
                className="fa-solid fa-pen"
                tabIndex={0}
                title="Editar título"
                onClick={handleModifyTitle}
                onKeyPress={e => (e.key === "Enter" ? handleModifyTitle(e) : null)}
              ></i>
            </div>
          ) : (
            <input
              id="name"
              onChange={handleInput}
              value={dataForm?.name}
              autoFocus
            />
          )}
          <div className="card-item">
            <label>Short URL</label>
            <p>{dataForm?.shortUrl}</p>
          </div>
          <div className="card-item">
            <label>Original URL: </label>
            {!modifyLink ? (
              <div className="card-item-value-row">
                <p>{dataForm?.originalUrl}</p>
                <i
                  className="fa-solid fa-pen"
                  tabIndex={0}
                  title="Editar URL"
                  onClick={handleModifyLink}
                  onKeyPress={e => (e.key === "Enter" ? handleModifyLink(e) : null)}
                ></i>
              </div>
            ) : (
              <input
                id="originalUrl"
                onChange={handleInput}
                value={dataForm?.originalUrl}
                autoFocus
              />
            )}
          </div>
          <div className="card-item">
            <label>Clicks: </label>
            <p>{dataForm?.accessCount}</p>
          </div>
          <div className="card-item">
            <label>Created At: </label>
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
            <label>Last Access: </label>
            <p>
              {dataForm?.accessCount > 0
                ? new Date(dataForm?.lastAccessedAt).toLocaleString(undefined, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-"}
            </p>
          </div>
          <div className="card-item">
            <label>State</label>
            <p>{dataForm?.isActive ? "Active" : "pause"}</p>
          </div>
          <div className="card-buttons">
            {(modifyLink || modifyTitle) && (
              <button
                className="card-button-modify"
                onClick={handleSubmit}
              >
                Modificar
              </button>
            )}
            {!modifyLink && !modifyTitle && (
              <button
                onClick={handlePause}
                className="card-button-pause"
              >
                {link.isActive ? "Pause" : "Active"}
              </button>
            )}
            <button
              onClick={handleCancel}
              className="card-button-delete"
            >
              {modifyLink || modifyTitle ? "cancelar" : "Eliminar"}
            </button>
            {message?.ok && <p>{message?.message}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLink;
