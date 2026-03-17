import { Box, Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: "#6c757d",
    borderRadius: "8px",
    "&.Mui-selected": {
      backgroundColor: "#0067c7",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#0052a3",
      },
    },
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.04)",
    },
  },
  "& .MuiPaginationItem-icon": {
    color: "#6c757d",
  },
}));

const PaginationBar = ({ count, limit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const totalPages = Math.ceil(count / limit);

  const handleChange = (event, value) => {
    searchParams.set("page", value);
    setSearchParams(searchParams);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (totalPages <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" sx={{ mt: 4, mb: 2 }}>
      <StyledPagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        shape="rounded"
        color="primary"
      />
    </Box>
  );
};

export default PaginationBar;
