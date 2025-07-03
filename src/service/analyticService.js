const baseUrl = import.meta.env.VITE_API_URL;
import { SummaryMainDTO } from "../DTO/SummaryMainDTO.js";
import { ErrorResponse } from "../util/errorUtil";

export async function fetchDashboardSummary(token, days = 30) {
  let response = await fetch(`${baseUrl}/link/dashboard-summary?days=${days}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  if (!response.ok) {
    const errorDetails = await ErrorResponse(response);
    throw new Error(errorDetails.message);
  }
  const rawData = await response.json();
  return SummaryMainDTO(rawData);
}

export async function fetchDashboardClicks(id, token, days = 30) {
  let response = await fetch(
    `${baseUrl}/link/link-summary/${id}?days=${days}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  );

  if (!response.ok) {
    const errorDetails = await ErrorResponse(response);
    throw new Error(errorDetails.message);
  }
  const rawData = await response.json();
  return SummaryMainDTO(rawData);
}
