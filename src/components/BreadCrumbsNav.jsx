import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const BreadCrumbsNav = ({ paths }) => {
  return (
    <Breadcrumbs separator=">" aria-label="breadcrumb" sx={{ mb: 2 }}>
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        if (isLast) {
          return (
            <Typography key={path.label} color="text.primary">
              {path.label}
            </Typography>
          );
        }
        return (
          <Link
            className="link"
            key={path.label}
            component={Link}
            to={path.to}
            underline="none"
            color="black"
          >
            {path.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbsNav;
