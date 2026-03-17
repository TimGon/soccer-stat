import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useError } from "../contexts/ErrorContext";
import { getTeam, getTeamsMatches } from "../api/teams";
import { Box, Container, Typography } from "@mui/material";
import BreadCrumbsNav from "../components/BreadCrumbsNav";
import DateRangeFilter from "../components/DateFilter";
import MatchTable from "../components/MatchTable";
import PaginationBar from "../components/PaginationBar";

const TeamCalendarPage = () => {
  const { id } = useParams(),
    [searchParams, setSearchParams] = useSearchParams(),
    page = parseInt(searchParams.get("page") || "1"),
    limit = 10,
    dateFrom = searchParams.get("dateFrom") || undefined,
    dateTo = searchParams.get("dateTo") || undefined,
    [matches, setMatches] = useState([]),
    [total, setTotal] = useState(0),
    [teamName, setTeamName] = useState(""),
    { showError } = useError();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getTeamsMatches(
          Number(id),
          dateTo,
          dateFrom,
          limit,
          (page - 1) * limit,
        );
        setMatches(data.matches);
        setTotal(data.count);
      } catch {
        showError("Не удалось загрузить матчи");
      }
    };
    if (id) {
      fetch();
    }
  }, [id, dateFrom, dateTo, page, limit, showError]);

  useEffect(() => {
    const fetchTeamName = async () => {
      try {
        const team = await getTeam(Number(id));
        setTeamName(team.name);
      } catch (err) {
        showError("Не удалось загрузить название команды");
      }
    };
    if (id) fetchTeamName();
  }, [id, showError]);

  const handleDateApply = (from, to) => {
    const params = { page: "1" };
    if (from && to) {
      params.dateFrom = from;
      params.dateTo = to;
    }
    setSearchParams(params);
  };

  return (
    <Container sx={{ py: 4 }}>
      <BreadCrumbsNav
        paths={[
          { label: "Команды", to: "/teams" },
          { label: teamName || "..." },
        ]}
        sx={{ mt: "14px" }}
      />
      <Box sx={{ mt: "52px", mb: 2 }}>
        <DateRangeFilter onApply={handleDateApply} />
      </Box>
      <MatchTable matches={matches} />
      <PaginationBar count={total} limit={limit} />
    </Container>
  );
};

export default TeamCalendarPage;
