import { useEffect, useState } from "react";
import useSession from "../hooks/useSession";
import { getLinks } from "../service/linkService";
import { LinksContext } from "./LinksContext";
// import useLinkCreate from "../hooks/useLinkCreate";
import { isTokenExpired } from "../util/tokenUtil";

export function LinksProvider({ children }) {
  const [loadingLinks, setLoadingLinks] = useState(true);
  const { session, logout } = useSession();
  // const { response } = useLinkCreate();

  const [userLinks, setUserLinks] = useState({
    shortUrl: "",
    originalUrl: "",
    name: "",
    accessCount: 0,
    createdAt: null,
    lastAccessedAt: null
  });

  useEffect(() => {
    const fetchData = async () => {

      if (!session) return;

      if(isTokenExpired(session))
      {
        logout();
        return;
      }
      
      let linksData = await getLinks(session);
      setUserLinks(linksData);
      setLoadingLinks(false);
    };

    fetchData();
  }, [session, logout]);

  return (
    <LinksContext.Provider
      value={{
        loadingLinks,
        userLinks,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
}
