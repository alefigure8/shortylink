const baseUrl = import.meta.env.VITE_API_URL;

import LinkClickDTO from "../DTO/LinkClickDTO.js";
import { SummaryMainDTO } from "../DTO/SummaryMainDTO.js";
import { ErrorResponse } from "../util/errorUtil";
import { SuccessResponse } from "../util/successUtil.js";

export async function fetchDashboardSummary(token, days = 30) {
  let response = await fetch(`${baseUrl}/link/dashboard-summary?days=${days}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : ""
        },
    });
  if (!response.ok) return await ErrorResponse(response);
  const rawData = await response.json();
  return SummaryMainDTO(rawData);
}

export async function fetchDashboardClicks(id, token)
{
   let response = await fetch(`${baseUrl}/link/${id}/clicks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : ""
        },
    });

  if (!response.ok) return await ErrorResponse(response);

  const rawData = await response.json();
  return LinkClickDTO(rawData);
}
