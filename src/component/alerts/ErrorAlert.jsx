function ErrorAlert({ error }) {

  return (
    <div className="alert alert-danger" role="alert">
      <h4 className="alert-heading">Error</h4>
      <p>{error.message}</p>
      {error.details && <pre>{JSON.stringify(error.details, null, 2)}</pre>}
    </div>
  );
}

export default ErrorAlert;
