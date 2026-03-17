import { apiClient } from "./client";

export const getTeams = async (limit, offset) => {
  const params = {};
  if (limit && offset) {
    params.limit = limit;
    params.offset = offset;
  }
  const res = await apiClient.get("teams", { params });
  return res.data;
};

export const getTeamsMatches = async (
  teamId,
  dateTo,
  dateFrom,
  limit,
  offset,
) => {
  const params = {};
  if (dateTo && dateFrom) {
    params.dateFrom = dateFrom;
    params.dateTo = dateTo;
  }
  if (limit && offset) {
    params.limit = limit;
    params.offset = offset;
  }
  const res = await apiClient.get(`teams/${teamId}/matches`, { params });
  return res.data;
};

export const getTeam = async (teamId) => {
  const res = apiClient.get(`teams/${teamId}`);
  return res.data;
};
