import { AppBar, Box, Tab, Tabs, Toolbar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/img/FIFA_logo.svg";

const NavTabs = () => {
  const location = useLocation();
  const currentTab = location.pathname.startsWith("/teams") ? 1 : 0;

  return (
    <AppBar
      position="static"
      color="white"
      sx={{ boxShadow: "none", backgroundColor: "white" }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 48 },
          pt: { xs: 2, md: 4 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Логотип FIFA"
          sx={{
            height: { xs: 30, sm: 40, md: 50 },
            width: "auto",
            maxWidth: "100%",
            marginRight: "35px",
          }}
        />

        <Tabs value={currentTab} textColor="black">
          <Tab
            label="Лиги"
            component={Link}
            to="/leagues"
            sx={{
              textTransform: "capitalize",
              fontSize: { xs: 14, sm: 18, md: 20 },
              fontWeight: 500,
              marginRight: { xs: "20px", sm: "" },
              color: "black",
              p: 0,
              minWidth: 0,
              minHeight: 0,
              "&:hover": {
                color: "#0067c7",
                opacity: 1,
              },
            }}
          />
          <Tab
            label="Команды"
            component={Link}
            to="/teams"
            sx={{
              textTransform: "capitalize",
              fontSize: { xs: 14, sm: 18, md: 20 },
              fontWeight: 500,
              color: "black",
              p: 0,
              minWidth: 0,
              minHeight: 0,
              "&:hover": {
                color: "#0067c7",
                opacity: 1,
              },
            }}
          />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default NavTabs;
