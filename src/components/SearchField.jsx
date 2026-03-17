import { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

const SearchField = ({ onSearch, placeholder = "Search..." }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    onSearch(debouncedValue);
    if (debouncedValue) {
      searchParams.set("q", debouncedValue);
    } else {
      searchParams.delete("q");
    }
    setSearchParams(searchParams, { replace: true });
  }, [debouncedValue, onSearch, searchParams, setSearchParams]);

  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      variant="outlined"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#6c757d" }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        backgroundColor: "#f8fcfb",
        borderRadius: 2,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            border: "none",
          },
        },
      }}
    />
  );
};

export default SearchField;
