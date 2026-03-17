import { Navigate, Route, Routes } from "react-router-dom";
import LeagueCalendarPage from "./pages/LeagueCalendarPage";
import LeaguePage from "./pages/LeaguePage";
import TeamCalendarPage from "./pages/TeamsCalendarPage";
import TeamsPage from "./pages/TeamsPage";
import NavTabs from "./components/Navigation";
import { Container, CssBaseline } from "@mui/material";
import "./assets/styles/style.css";
import ErrorMsg from "./components/Errors/ErrorMsg";
import ErrorBoundary from "./components/Errors/Error";

function App() {
  return (
    <>
      <ErrorBoundary ErrorComponent={ErrorMsg}>
        <NavTabs />
        <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/leagues" replace />} />
            <Route path="/leagues" element={<LeaguePage />} />
            <Route
              path="/leagues/:id/matches"
              element={<LeagueCalendarPage />}
            />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:id/matches" element={<TeamCalendarPage />} />
            <Route path="*" element={<Navigate to="/leagues" replace />} />
          </Routes>
        </Container>
      </ErrorBoundary>
    </>
  );
}

export default App;
