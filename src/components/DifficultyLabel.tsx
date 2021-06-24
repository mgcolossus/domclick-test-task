import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";

interface Props {
  difficulty: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    difficulty: {
      padding: theme.spacing(0.5),
      borderRadius: theme.spacing(1),
      marginLeft: "auto",
      alignSelf: "baseline"
    },
    difficultyEasy: {
      backgroundColor: "rgba(96, 181, 99, 0.5)"
    },
    difficultyMedium: {
      backgroundColor: "rgba(227, 232, 81, 0.5)"
    },
    difficultyHard: {
      backgroundColor: "rgba(230, 71, 71, 0.5)"
    }
  })
);

export const DifficultyLabel = ({ difficulty }: Props) => {
  if (!["easy", "medium", "hard"].includes(difficulty)) {
    throw Error(`Unexpected 'difficulty' value: ${difficulty}`);
  }
  const classes = useStyles();
  return (
    <Grid
      className={classnames(classes.difficulty, {
        [classes.difficultyEasy]: difficulty === "easy",
        [classes.difficultyMedium]: difficulty === "medium",
        [classes.difficultyHard]: difficulty === "hard"
      })}
      item
    >
      <Typography variant="subtitle2">{difficulty}</Typography>
    </Grid>
  );
};
