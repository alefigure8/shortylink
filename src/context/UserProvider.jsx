import { useCallback, useEffect, useState } from "react";
import { UserContext } from "./userContext";
import { getUser, updateUser } from "../service/userService";
import useSession from "../hooks/useSession";
import { isTokenExpired } from "../util/tokenUtil";
import useLoading from "../hooks/useLoading";

export function UserProvider({ children }) {
  const { startLoading, stopLoading } = useLoading();
  const [user, setUser] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const { session } = useSession();
  const [dataForm, setDataForm] = useState({
    fullname: "",
    firstName: "",
    lastName: "",
    email: "",
    profilePictureUrl: "",
    totalLinks: 0,
  });
  const [error, setError] = useState(null);

  // Obtener usuario
  const userData = useCallback(async () => {
    try {
      startLoading();
      if (!session?.token) return;
      let userFetch = await getUser(session.token);
      setUser(userFetch);
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  }, [session, startLoading, stopLoading]);

  useEffect(() => {
    userData();
  }, [userData]);

  const handleEditProfile = (event) => {
    event.preventDefault();
    setDataForm(user);
    setEditProfile(!editProfile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      startLoading();
      if (isTokenExpired(session)) {
        throw new Error("Token expirado, por favor inicia sesión nuevamente.");
      }
      await updateUser(session?.token, dataForm);
      const updatedUser = await getUser(session?.token);
      setUser(updatedUser);
      setEditProfile(false);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setDataForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        editProfile,
        error,
        dataForm,
        setDataForm,
        handleSubmit,
        handleInputChange,
        handleEditProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
