import { Grid, Paper, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { ResultStats } from "../types/quizData";

interface Props {
  resultStats: null | ResultStats;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    }
  })
);

export const QuizResultStats = ({ resultStats }: Props) => {
  const classes = useStyles();

  if (resultStats === null) {
    throw Error("resultStats is null");
  }

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              You answered {resultStats.correctCount} out of {resultStats.questionsCount} correctly
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Easy: {resultStats.easyCorrect} out of {resultStats.easyAll}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Medium: {resultStats.mediumCorrect} out of {resultStats.mediumAll}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Hard: {resultStats.hardCorrect} out of {resultStats.hardAll}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
