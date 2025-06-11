export function TokenResponseDTO(response) {
  return {
    token: response.token,
    email: response.email,
    expiration: new Date(response.expiration),
    isValid: response.isValid
  };
}