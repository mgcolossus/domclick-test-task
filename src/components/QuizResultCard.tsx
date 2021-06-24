import { FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import classnames from "classnames";
import React from "react";
import { Question } from "../types/quizData";
import { DifficultyLabel } from "./DifficultyLabel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    },
    difficulty: {
      padding: theme.spacing(0.5),
      backgroundColor: "rgba(96, 181, 99, 0.5)",
      borderRadius: theme.spacing(1),
      marginLeft: "auto",
      alignSelf: "baseline"
    },
    resultOption: {
      borderRadius: theme.spacing(1)
    },
    resultOptionLabel: {
      color: "black"
    },
    correctAnswer: {
      backgroundColor: "rgba(9, 181, 41, 0.5)"
    },
    incorrectAnswer: {
      backgroundColor: "rgba(255, 64, 64, 0.5)"
    },
    formControl: {
      width: "100%"
    }
  })
);

interface Props {
  questionData: Question;
}

export const QuizResultCard = ({ questionData }: Props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={1}>
          <DifficultyLabel difficulty={questionData.difficulty} />
          <Grid item xs={12}>
            <Typography
              dangerouslySetInnerHTML={{
                __html: questionData.question
              }}
              variant="h5"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <RadioGroup name={questionData.question} value={questionData.userAnswer}>
                {questionData.answerOptionsToShow.map((optionText) => (
                  <FormControlLabel
                    key={optionText}
                    value={optionText}
                    disabled
                    className={classnames(classes.resultOption, {
                      [classes.incorrectAnswer]:
                        optionText === questionData.userAnswer && optionText !== questionData.correct_answer,
                      [classes.correctAnswer]: optionText === questionData.correct_answer
                    })}
                    control={<Radio color="primary" />}
                    label={
                      <Typography
                        className={classes.resultOptionLabel}
                        variant="body1"
                        dangerouslySetInnerHTML={{
                          __html: optionText
                        }}
                      />
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
