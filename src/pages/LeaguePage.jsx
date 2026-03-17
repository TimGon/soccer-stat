import { use, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useError } from "../contexts/ErrorContext";
import { getCompetitions } from "../api/competition";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SearchField from "../components/SearchField";
import PaginationBar from "../components/PaginationBar";

const LeaguePage = () => {
  const [searchParams] = useSearchParams(),
    page = parseInt(searchParams.get("page") || "1"),
    limit = 10,
    [competitions, setCompetitions] = useState([]),
    [filtered, setFiltered] = useState([]),
    [total, setTotal] = useState(0),
    [searchQuery, setSearchQuery] = useState(""),
    navigate = useNavigate(),
    { showError } = useError();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCompetitions(limit, (page - 1) * limit);
        setCompetitions(data.competitions);
        setTotal(data.count);
      } catch {
        showError("Не удалось загрузить список лиг");
      }
    };
    fetch();
  }, [page, limit, showError]);

  useEffect(() => {
    setFiltered(
      competitions.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.area.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [searchQuery, competitions]);
  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: "84px" }}>
        <SearchField onSearch={setSearchQuery} placeholder="Search" />
      </Box>
      {competitions.length === 0 ? (
        <Typography variant="body1" color="error" align="center">
          Не удалось загрузить лиги. Проверьте подключение к интернету или
          попробуйте позже.
        </Typography>
      ) : filtered.length === 0 ? (
        <Typography variant="body1" align="center">
          Ничего не найдено
        </Typography>
      ) : (
        <Grid container spacing={2} sx={{ display: "flex" }}>
          {filtered.map((comp) => (
            <Grid
              item
              key={comp.id}
              xs={12}
              sm={6}
              md={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                onClick={() => navigate(`/leagues/${comp.id}/matches`)}
                sx={{
                  width: { xs: "100%", sm: 304 },
                  maxWidth: 304,
                  height: 315,
                  cursor: "pointer",
                  borderRadius: 3,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.2s",
                  boxShadow: "none",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Avatar
                    src={
                      comp.emblem || "https://crests.football-data.org/ac.png"
                    }
                    alt={comp.name}
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      borderRadius: 0,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "100%",
                    }}
                  >
                    {comp.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textAlign: "center",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "100%",
                    }}
                  >
                    {comp.area.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {!searchQuery && <PaginationBar count={total} limit={limit} />}
    </Container>
  );
};

export default LeaguePage;
