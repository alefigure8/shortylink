export const isTokenExpired = (session) => {
  const expirationTime = new Date(session?.expiration).getTime();
  const now = Date.now();
  return expirationTime < now;
};

export const shouldRefreshToken = (session) => {
  const expirationTime = new Date(session?.expiration).getTime();
  const now = Date.now();

  const timeLeft = expirationTime - now;

  return timeLeft > 0 && timeLeft < 300_000;
};