function LinkClickDTO(response) {

  if (response?.ClickedAt)
    response.ClickedAt = new Date(response.ClickedAt).toLocaleDateString(
      undefined,
      { year: "numeric", month: "numeric", day: "numeric" }
    );

  return {
    ClickedAt: response.ClickedAt || "",
    IpAddress: response.IpAddress || "",
    UserAgent: response.UserAgent || "",
    Referer: response.Referer || "",
    CountryCod: response.CountryCod || "",
    Country: response.Country || "",
    City: response.City || "",
    Latitude: response.Latitude || "",
    Longitude: response.Longitude || "",
  };
}

export default LinkClickDTO;
