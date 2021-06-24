import { FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useActions } from "./../hooks/useActions";
import { useTypedSelector } from "./../hooks/useTypedSelector";
import { DifficultyLabel } from "./DifficultyLabel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
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

export const QuizCard = () => {
  const { questionsData, currentQuestionIndex } = useTypedSelector((state) => state.quizData);
  const { changeAnswerForCurrentQuestion, goToNextQuestion, prepareQuizResults } = useActions();

  const currentQuestionData = questionsData[currentQuestionIndex];
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={1}>
          <Grid item>
            <Typography variant="subtitle1">{`Question ${currentQuestionIndex + 1} out of ${
              questionsData.length
            }`}</Typography>
          </Grid>
          <DifficultyLabel difficulty={currentQuestionData.difficulty} />
          <Grid item xs={12}>
            <Typography
              dangerouslySetInnerHTML={{
                __html: currentQuestionData.question
              }}
              variant="h5"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <RadioGroup
                name={currentQuestionData.question}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  changeAnswerForCurrentQuestion(e.target.value);
                  if (currentQuestionIndex < questionsData.length - 1) {
                    goToNextQuestion();
                  } else {
                    prepareQuizResults();
                  }
                }}
                value={currentQuestionData.userAnswer}
              >
                {currentQuestionData.answerOptionsToShow.map((optionText) => (
                  <FormControlLabel
                    key={optionText}
                    value={optionText}
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
