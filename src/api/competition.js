import { apiClient } from "./client";

export const getCompetitions = async (limit, offset) => {
  const params = {};
  if (limit && offset) {
    params.limit = limit;
    params.offset = offset;
  }
  const res = await apiClient.get("competitions", { params });
  console.log("Вот что здесь есть", res.data);
  return res.data;
};

export const getCompetitionsMatches = async (
  competitionId,
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
  const res = await apiClient.get(`competitions/${competitionId}/matches`, {
    params,
  });
  console.log(res.data);
  return res.data;
};
