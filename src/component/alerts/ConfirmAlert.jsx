import "../../styles/component/Message.css";

function ConfirmAlert({ text, type, onConfirm }) {

  const handleOptionConfirm = (event, option) => {
    event.preventDefault();
    onConfirm(option);
  };

  return (
    <div className="alert-overlay">
      <div className="alert">
        <div className="header">
          <div className="icon">
            <i
              className={
                type == "warning"
                  ? "fas fa-warning"
                  : "fas fa-xmark-circle"
              }
            ></i>
          </div>
          <h3>{type ? "Advertencia" : "Error"}</h3>
        </div>
        <div className="content">
          <div className="link-info">
            <div className="info-item">
              <p>{text}</p>
            </div>
          </div>
          <div className="confirmation-buttons">
            <button className="btn-confirm btn-yes" onClick={(e) => handleOptionConfirm(e, true)}>
              Sí
            </button>
            <button className="btn-confirm btn-no" onClick={(e) => handleOptionConfirm(e, false)}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmAlert;
