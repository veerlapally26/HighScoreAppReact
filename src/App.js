import React, { useEffect, useState } from "react";
import { find, isEmpty, get, random } from "lodash";
import axios from "axios";
import { Container, Box, Paper, Checkbox } from '@mui/material';
import { Divider, FormControlLabel, TextField, Typography } from "@material-ui/core";
import './App.css';
import TableComponent from "./components/table-component";
import Footer from "./components/footer";

const App = () => {
  const [scoreData, setScoreData] = useState({});
  const [sortByAverage, setSortByAverage] = useState(false);
  const [counter, setCounter] = useState(10);
  const [name, saveName] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    getScore();
  }, [counter]);

  const handleSort = () => {
    setSortByAverage(!sortByAverage);
  };

  const getScore = async () => {
    const response = await axios.get(
      `http://localhost:5000/scoredata`
    );  
    setScoreData(response.data);
  };

  const generateScore = () => {
    setCounter(counter - 1);
    setScore(score + random(-100, 100));
  };

  const submitScore = () => {
    const playerExists = find(scoreData, item => item.name === name);
    const postUrl = isEmpty(playerExists) ? `http://localhost:5000/scoredata` : `http://localhost:5000/scoredata/${get(playerExists, "id")}`;
    if(isEmpty(playerExists))
      axios.post(postUrl, { name, totalPoints: score, clicks: 10 - counter });
    else
      axios.put(postUrl, { name, totalPoints: score, clicks: 10 - counter });
    setCounter(10);
    setScore(0);
    saveName("");
  };

  return (
    <Container className="App">
      <Box
        sx={{
          '& > :not(style)': {
            m: 2
          },
          display: 'flex'
        }}
      >
        <Paper elevation={3} style={{ width: "100%", padding: "16px" }} >

          <Typography data-testid='header-text' variant="h3" align="center">
            LEADER BOARD
          </Typography>

          <Typography align={"right"} variant={"body2"}>
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  checked={sortByAverage}
                  onChange={handleSort}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Sort By Average?"
              labelPlacement="end"
            />
          </Typography>
          {
            scoreData &&
            <TableComponent
              data-testid='score-data'
              scoreData={scoreData}
              sortByAverage={sortByAverage}
            />
          }

          <Divider variant="middle" style={{margin: "16px 0"}} />

          <TextField
            value={name}
            fullWidth
            data-testid="player-name"
            label="Player Name"
            onChange={(e) => saveName(e.target.value)}
            variant="outlined"
            required
            autoFocus
            style={{ margin: "16px 0" }}
          />

          <Typography data-testid="score" align="center" variant="h6">
            Score: {score}
            <br />
            <Typography data-testid="counter" variant="caption">
              {counter} clicks left.
            </Typography>
          </Typography>

          <Footer
            counter={counter}
            name={name}
            generateScore={generateScore}
            submitScore={submitScore}
          />

        </Paper>
      </Box>
    </Container>
  );
}

export default App;
