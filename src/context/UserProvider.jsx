import { useEffect, useState } from "react";
import { UserContext } from "./userContext";
import { getUser, updateUser } from "../service/userService";
import useSession from "../hooks/useSession";
import { isTokenExpired } from "../util/tokenUtil";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    const userData = async () => {
      try {
        if (!session?.token) return;
        let userFetch = await getUser(session.token);
        setUser(userFetch);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    userData();
  }, [session]);

  const handleEditProfile = (event) => {
    event.preventDefault();
    setDataForm(user);
    setEditProfile(!editProfile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
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
    }

    setLoading(false);
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
        loading,
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
