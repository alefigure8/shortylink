import { useCallback, useEffect, useState } from "react";
import useSession from "../hooks/useSession";
import {
  getLinkById,
  getLinks,
  redirectTo,
  sendingPass,
} from "../service/linkService";
import { LinksContext } from "./LinksContext";
import { isTokenExpired } from "../util/tokenUtil";
import useLoading from "../hooks/useLoading";
import useMessage from "../hooks/useMessage";
import { useNavigate } from "react-router-dom";

export function LinksProvider({ children }) {
  const { session, logout } = useSession();
  const { startLoading, stopLoading } = useLoading();
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  const [userLinks, setUserLinks] = useState({
    shortUrl: "",
    originalUrl: "",
    name: "",
    accessCount: 0,
    createdAt: null,
    lastAccessedAt: null,
  });

  const [link, setLink] = useState({
    shortUrl: "",
    originalUrl: "",
    name: "",
    accessCount: 0,
    createdAt: null,
    lastAccessedAt: null,
  });

  const [page, setPage] = useState(1);
  const [linkAmount, setLinkAmount] = useState(5);

  // --- OBTENER LINKS ---
  const fetchData = useCallback(async () => {
    startLoading();
    try {
      if (!session) return;

      if (isTokenExpired(session)) {
        logout();
        setUserLinks({});
        return;
      }
      let linksData = await getLinks(page, linkAmount, session?.token);
      setUserLinks(linksData);
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      stopLoading();
    }
  }, [logout, session, startLoading, stopLoading, showMessage, page, linkAmount]);

  useEffect(() => {
    if (session) fetchData();
  }, [session, fetchData]);

  // --- LINK POR ID ---
  const linkById = useCallback(
    async (id) => {
      try {
        startLoading();
        var link = await getLinkById(id, session);
        setLink(link);
      } catch (error) {
        showMessage(error.message, "error");
        setLink({});
      } finally {
        stopLoading();
      }
    },
    [session, setLink, startLoading, stopLoading, showMessage]
  );

  // --- VERIFICA PASS ---
  const verifyPass = useCallback(
    async ({ id, password }) => {
      try {
        startLoading();
        await sendingPass(id, password);
      } catch (error) {
        showMessage(error.message, "error");
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading, showMessage]
  );

  // --- REDIRIGE HACIA LINK EXTERNO ---
  const redirectToLink = useCallback(
    async (id) => {
      try {
        await redirectTo(id);
      } catch (error) {
        showMessage(error.message, "error");
        navigate("/brokenlink");
      } finally {
        // stopLoading();
      }
    },
    [showMessage, navigate]
  );

  return (
    <LinksContext.Provider
      value={{
        userLinks,
        page,
        linkAmount,
        link,

        setPage,
        setLinkAmount,
        setLink,

        linkById,
        verifyPass,
        redirectToLink,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
}
