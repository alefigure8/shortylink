import { useCallback, useState } from "react";
import { LoadingContext } from "./LoadingContext";

export function LoadingProvider({ children }) {
  const [loadingCount, setLoadingCount] = useState(0); // Para manejar múltiples cargas concurrentes

  const startLoading = useCallback(() => {
    setLoadingCount((prevCount) => prevCount + 1);
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingCount((prevCount) => {
        if((prevCount - 1) < 0) return 0;
        return Math.max(0, prevCount - 1)
    });
  }, []);
  
  const isLoading = loadingCount > 0;

  return (
    <LoadingContext.Provider value={{startLoading, stopLoading, isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
