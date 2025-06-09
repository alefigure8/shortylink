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
            <div className="dashboard-card-profile-body">
              <input
                id="firstName"
                value={dataForm?.firstName}
                onChange={(e) => handleInputChange(e)}
              />
              <input
                id="lastName"
                value={dataForm?.lastName}
                onChange={(e) => handleInputChange(e)}
              />
              <input
                id="profilePictureUrl"
                value={dataForm?.profilePictureUrl}
                onChange={(e) => handleInputChange(e)}
              />
              <div className="dashboard-card-buttons">
                <button
                  className="btn btn-submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Guardar cambios
                </button>
                <button
                  className="btn btn-cancel"
                  onClick={(e) => handleEditProfile(e)}
                >
                  Cancelar
                </button>
              </div>
            </div>
            {error && (<p>{error?.message}</p>)}
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
