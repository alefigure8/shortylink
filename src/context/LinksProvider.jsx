import { useEffect, useState } from "react";
import useSession from "../hooks/useSession";
import { getLinkById, getLinks } from "../service/linkService";
import { LinksContext } from "./LinksContext";
// import useLinkCreate from "../hooks/useLinkCreate";
import { isTokenExpired } from "../util/tokenUtil";

export function LinksProvider({ children }) {
  const [loadingLinks, setLoadingLinks] = useState(true);
  const [loadingLink, setLoadingLink] = useState(true);
  const { session, logout } = useSession();

  const [userLinks, setUserLinks] = useState({
    shortUrl: "",
    originalUrl: "",
    name: "",
    accessCount: 0,
    createdAt: null,
    lastAccessedAt: null,
  });

  const [link, setLinks] = useState({
    shortUrl: "",
    originalUrl: "",
    name: "",
    accessCount: 0,
    createdAt: null,
    lastAccessedAt: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!session) return;

      if (isTokenExpired(session)) {
        logout();
        return;
      }

      let linksData = await getLinks(session);
      setUserLinks(linksData);
      setLoadingLinks(false);
    };

    fetchData();
  }, [session, logout]);

  const linkById = async (id) => {
    var link = await getLinkById(id, session);
    setLinks(link);
    setLoadingLink(false);
  };

  return (
    <LinksContext.Provider
      value={{
        loadingLinks,
        userLinks,
        linkById,
        loadingLink,
        link
      }}
    >
      {children}
    </LinksContext.Provider>
  );
}
