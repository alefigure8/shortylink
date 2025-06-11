export function UserResponseDTO(response) {
  return {
    email: response?.email || "",
    fullName: response?.fullName || "",
    firstName: response?.firstName || "",
    lastName: response?.lastName || "",
    profilePictureUrl: response?.profilePictureUrl || "",
    totalLinks: response?.totalLinks || 0,
  };
}