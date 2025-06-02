
/**
 * 
 * @param {*} param0 
 * @returns 
 */
function SuccedLinkCreated({ response }) {
  return (
    <>
      <div className="response-section">
        <p>Respuesta del servidor:</p>
        <p><span>Nombre:</span> {response.name}</p>
        <p><span>URL Original:</span> {response.originalUrl}</p>
        <p>
          <span>Short URL:</span> <a href={response.shortUrl}>{response.shortUrl}</a>
        </p>
        <p>
          <strong>¡Enlace creado exitosamente!</strong>
        </p>
      </div>
      
    </>
  );
}

export default SuccedLinkCreated;
