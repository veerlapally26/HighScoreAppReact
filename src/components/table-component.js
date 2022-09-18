import React from "react";
import { map, slice} from "lodash";
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import { calculateAverage, sortListByAverage } from "../helpers/score-helper";

const TableComponent = ({
  scoreData,
  sortByAverage
}) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const sortedData = scoreData &&  Array.from(scoreData).sort((player1, player2) => sortListByAverage(player1, player2, sortByAverage));

  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Score</StyledTableCell>
                <StyledTableCell align="center">Clicks</StyledTableCell>
                <StyledTableCell align="center">Average</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {
                scoreData &&
                map((slice(sortedData, 0, 10)), (player) => (
                <StyledTableRow key={player.name}>
                    <StyledTableCell component="th" scope="row">
                    {player.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{player.totalPoints}</StyledTableCell>
                    <StyledTableCell align="center">{player.clicks}</StyledTableCell>
                    <StyledTableCell align="center">{calculateAverage(player.totalPoints, player.clicks).toFixed(2)}</StyledTableCell>
                </StyledTableRow>
                ))
            }
            </TableBody>
        </Table>
    </TableContainer>
  );
};

export default TableComponent;