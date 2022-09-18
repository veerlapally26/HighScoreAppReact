import React from "react";
import { Button, Typography } from "@material-ui/core";

const Footer = ({
  counter,
  name,
  generateScore,
  submitScore
}) =>
  <React.Fragment>
    <Button
      fullWidth
      disabled={!counter || !name}
      variant="outlined"
      color="primary"
      size="large"
      onClick={generateScore}
      style={{ margin: "8px 0" }}
      data-testid="score-button"
    >
      <Typography variant="button">Score</Typography>
    </Button>

    <Button
      fullWidth
      disabled={counter !== 0}
      onClick={submitScore}
      type="submit"
      variant="contained"
      color="primary"
      size="large"
      data-testid="send-button"
    >
      <Typography variant="button">Send it!</Typography>
    </Button>
  </React.Fragment>;

export default Footer;