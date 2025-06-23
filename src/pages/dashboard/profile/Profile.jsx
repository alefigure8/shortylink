import "../../../App.css";
import "../../../styles/pages/dashboard/profile/Profile.css";
import Spinner from "../../../component/spinner/Spinner.jsx";
import useProfile from "../../../hooks/useProfile";

function Profile() {
  const {
    user,
    loading,
    editProfile,
    error,
    handleSubmit,
    handleInputChange,
    dataForm,
    handleEditProfile,
  } = useProfile();

  if (loading)
    return (
      <>
          <Spinner />
      </>
    );

  return (
    <>
      <div className="dashboard-main-container">
        {!editProfile ? (
          <div className="dashboard-card-profile">
            <div className="dashboard-card-profile-content">
              {
                user?.profilePictureUrl&&
                <img
                src={user?.profilePictureUrl}
                alt="Foto de perfil"
                className="profile-img"
              />
              }
            </div>
            <div className="dashboard-card-profile-body">
              <h2>{user?.fullName}</h2>
              <p>{user?.email}</p>
              <button
                type="button"
                className="btn btn-submit"
                onClick={(e) => handleEditProfile(e)}
              >
                Cambiar datos
              </button>
            </div>
          </div>
        ) : (
          <div className="dashboard-card-profile">
            <div className="dashboard-card-profile-content">
              <img
                src={dataForm?.profilePictureUrl}
                alt="Foto de perfil"
                className="profile-img"
              />
            </div>
            <form className="dashboard-card-profile-body" onSubmit={handleSubmit}>
              <label htmlFor="firstName">Nombre</label>
              <input
                id="firstName"
                value={dataForm?.firstName}
                onChange={handleInputChange}
                placeholder="Nombre"
                autoComplete="off"
              />
              <label htmlFor="lastName">Apellido</label>
              <input
                id="lastName"
                value={dataForm?.lastName}
                onChange={handleInputChange}
                placeholder="Apellido"
                autoComplete="off"
              />
              <label htmlFor="profilePictureUrl">Foto de perfil (URL)</label>
              <input
                id="profilePictureUrl"
                value={dataForm?.profilePictureUrl}
                onChange={handleInputChange}
                placeholder="URL de la foto de perfil"
                autoComplete="off"
              />
              <div className="dashboard-card-buttons">
                <button
                  className="btn btn-submit"
                  type="submit"
                >
                  Guardar cambios
                </button>
                <button
                  className="btn btn-cancel"
                  type="button"
                  onClick={handleEditProfile}
                >
                  Cancelar
                </button>
              </div>
              {error && (<p className="login-error">{error?.message}</p>)}
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
