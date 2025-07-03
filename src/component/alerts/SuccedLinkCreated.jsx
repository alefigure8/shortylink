import { useState } from 'react';
import '../../styles/component/SuccedLinkCreated.css';
import useMessage from '../../hooks/useMessage';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
function SuccedLinkCreated({ response, onClose }) {
  const [copied, setCopied] = useState(false);
  const {showMessage} = useMessage();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showMessage(err.message)
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <div className="success-alert-overlay">
        <div className="success-alert">
          <button className="close-button" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
          
          <div className="success-header">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>¡Enlace creado exitosamente!</h3>
          </div>
          
          <div className="success-content">
            <div className="link-info">
              <div className="info-item">
                <label>Nombre:</label>
                <span>{response.name}</span>
              </div>
              
              <div className="info-item">
                <label>URL Original:</label>
                <span className="original-url">{response.originalUrl}</span>
              </div>
              
              <div className="info-item">
                <label>URL Corta:</label>
                <div className="short-url-container">
                  <span className="short-url">{response.shortUrl}</span>
                  <button 
                    className={`copy-button ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                    title={copied ? '¡Copiado!' : 'Copiar URL'}
                  >
                    <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="success-actions">
              <a 
                href={response.shortUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="test-link-button"
              >
                <i className="fas fa-external-link-alt"></i>
                Probar enlace
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccedLinkCreated;
