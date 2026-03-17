import { useEffect, useState } from "react";
import { getTeams } from "../api/teams";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useError } from "../contexts/ErrorContext";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SearchField from "../components/SearchField";
import PaginationBar from "../components/PaginationBar";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]),
    [searchParams] = useSearchParams(),
    [searchQuery, setSearchQuery] = useState(""),
    [total, setTotal] = useState(0),
    page = parseInt(searchParams.get("page") || "1"),
    limit = 10,
    [filtered, setFiltered] = useState([]),
    navigate = useNavigate(),
    { showError } = useError();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getTeams(limit, (page - 1) * limit);
        setTeams(data.teams);
        setTotal(data.count);
      } catch {
        showError("Не удалось загрузить команды.");
      }
    };
    fetch();
  }, [page, limit, showError]);

  useEffect(() => {
    setFiltered(
      teams.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [searchQuery, teams]);

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: "84px" }}>
        <SearchField onSearch={setSearchQuery} placeholder="Search" />
      </Box>
      {teams.length === 0 ? (
        <Typography variant="body1" color="error" align="center">
          Не удалось загрузить команды. Проверьте подключение к интернету или
          попробуйте позже.
        </Typography>
      ) : filtered.length === 0 ? (
        <Typography variant="body1" align="center">
          Ничего не найдено
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((team) => (
            <Grid item xs={12} sm={6} md={4} key={team.id}>
              <Card
                onClick={() => navigate(`/teams/${team.id}/matches`)}
                sx={{
                  cursor: "pointer",
                  width: { xs: "100%", sm: 156 },
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
                <CardMedia
                  component="img"
                  image={team.crestUrl}
                  alt="team image"
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 2,
                    borderRadius: 0,
                    display: "block",
                    mx: "auto",
                  }}
                />
                <CardContent>
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
                    {team.name}
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

export default TeamsPage;
