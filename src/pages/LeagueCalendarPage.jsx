import { useParams, useSearchParams } from "react-router-dom";
import { getCompetitionsMatches } from "../api/competition";
import BreadCrumbsNav from "../components/BreadCrumbsNav";
import DateRangeFilter from "../components/DateFilter";
import PaginationBar from "../components/PaginationBar";
import { useEffect, useState } from "react";
import { useError } from "../contexts/ErrorContext";
import { Box, Container, Typography } from "@mui/material";
import MatchTable from "../components/MatchTable";

const LeagueCalendarPage = () => {
  const { id } = useParams(),
    [searchParams, setSearchParams] = useSearchParams(),
    page = parseInt(searchParams.get("page") || "1"),
    limit = 10,
    dateFrom = searchParams.get("dateFrom") || undefined,
    dateTo = searchParams.get("dateTo") || undefined,
    [matches, setMatches] = useState([]),
    [total, setTotal] = useState(0),
    [leagueName, setLeagueName] = useState(""),
    { showError } = useError();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCompetitionsMatches(
          Number(id),
          dateFrom,
          dateTo,
          limit,
          (page - 1) * limit,
        );
        setMatches(data.matches);
        setTotal(data.count);
        if (data.competition) {
          setLeagueName(data.competition.name);
        }
      } catch {
        showError("Не удалось загрузить матчи");
      }
    };
    if (id) {
      fetch();
    }
  }, [id, dateFrom, dateTo, page, limit, showError]);

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
          { label: "Лиги", to: "/leagues" },
          { label: leagueName || "..." },
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

export default LeagueCalendarPage;
