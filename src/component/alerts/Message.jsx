import "../../styles/component/Message.css"

function Message({ text, type }) {
  return (
      <div className="alert-overlay">
        <div className="alert">         
          <div className="header">
            <div className="icon">
              <i className={type == 'success' ? "fas fa-check-circle" : "fas fa-xmark-circle"}></i>
            </div>
            <h3>{type}</h3>
          </div>
          <div className="content">
            <div className="link-info">
              <div className="info-item">
                <p>{text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}

export default Message;