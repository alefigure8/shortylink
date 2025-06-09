export const isTokenExpired = (session) => {
  const expirationTime = new Date(session?.expiration).getTime();
  const now = Date.now();
  return expirationTime < now;
};
