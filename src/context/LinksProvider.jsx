import { useEffect, useState } from "react";
import useSession from "../hooks/useSession";
import { getLinks } from "../service/linkService";
import { LinksContext } from "./LinksContext";
import useLinkCreate from "../hooks/useLinkCreate";

export function LinksProvider({ children }) {
  const [loadingLinks, setLoadingLinks] = useState(true);
  const { session } = useSession();
  const { response } = useLinkCreate();

  const [userLinks, setUserLinks] = useState({
    shortUrl: "",
    originalUrl: "",
    name: "",
    accessCount: 0,
    createdAt: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      let linksData = await getLinks(session);
      setUserLinks(linksData);
      setLoadingLinks(false);
    };

    fetchData();
  }, [session, response]);

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
