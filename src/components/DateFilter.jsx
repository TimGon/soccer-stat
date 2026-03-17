import { Box, Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";

const DateRangeFilter = ({ onApply }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dateFromParam = searchParams.get("dateFrom");
  const dateToParam = searchParams.get("dateTo");

  const dateFromValue = dateFromParam ? new Date(dateFromParam) : null;
  const dateToValue = dateToParam ? new Date(dateToParam) : null;

  const handleDateFromChange = (newDate) => {
    const params = new URLSearchParams(searchParams);
    if (newDate) {
      params.set("dateFrom", format(newDate, "yyyy-MM-dd"));
    } else {
      params.delete("dateFrom");
    }
    params.set("page", "1");
    setSearchParams(params);

    const newFrom = newDate ? format(newDate, "yyyy-MM-dd") : null;
    const newTo = dateToParam || null;
    if (newFrom && newTo) {
      onApply(newFrom, newTo);
    } else {
      onApply(null, null);
    }
  };

  const handleDateToChange = (newDate) => {
    const params = new URLSearchParams(searchParams);
    if (newDate) {
      params.set("dateTo", format(newDate, "yyyy-MM-dd"));
    } else {
      params.delete("dateTo");
    }
    params.set("page", "1");
    setSearchParams(params);

    const newFrom = dateFromParam || null;
    const newTo = newDate ? format(newDate, "yyyy-MM-dd") : null;
    if (newFrom && newTo) {
      onApply(newFrom, newTo);
    } else {
      onApply(null, null);
    }
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2">Матчи с</Typography>
          <DatePicker
            value={dateFromValue}
            onChange={handleDateFromChange}
            format="dd.MM.yyyy"
            slotProps={{
              textField: {
                size: "small",
                placeholder: "",
              },
            }}
            sx={{ backgroundColor: "white" }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2">по</Typography>
          <DatePicker
            value={dateToValue}
            onChange={handleDateToChange}
            format="dd.MM.yyyy"
            slotProps={{
              textField: {
                size: "small",
                placeholder: "",
              },
            }}
            sx={{ backgroundColor: "white" }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default DateRangeFilter;
