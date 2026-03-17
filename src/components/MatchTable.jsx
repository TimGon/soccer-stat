import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableBody,
  TableHead,
} from "@mui/material";
import { formatDate, formatScore, formatTime } from "../utils/dateUtil";
import { getStatusText } from "../utils/statusText";

const MatchTable = ({ matches }) => {
  if (!matches || matches.length === 0) {
    return <div>Нет матчей</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {matches.map((match) => (
            <TableRow key={match?.id ?? Math.random()}>
              <TableCell>{formatDate(match?.utcDate)}</TableCell>
              <TableCell>{formatTime(match?.utcDate)}</TableCell>
              <TableCell>{getStatusText(match?.status)}</TableCell>
              <TableCell>
                {match?.homeTeam?.name ?? "?"} — {match?.awayTeam?.name ?? "?"}
              </TableCell>
              <TableCell>{formatScore(match)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MatchTable;
