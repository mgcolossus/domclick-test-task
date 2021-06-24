import { Container, CssBaseline, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useEffect } from "react";
import "./App.scss";
import { ErrorBlock } from "./components/ErrorBlock";
import { Loading } from "./components/Loading";
import { QuizCard } from "./components/QuizCard";
import { QuizResultCard } from "./components/QuizResultCard";
import { QuizResultStats } from "./components/QuizResultStats";
import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4)
    }
  })
);

export const App: React.FC = () => {
  const { questionsData, error, loading, finished, resultStats } = useTypedSelector((state) => state.quizData);
  const { fetchQuizData } = useActions();
  const classes = useStyles();

  useEffect(() => {
    fetchQuizData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || questionsData.length === 0) {
    return <Loading />;
  }

  if (error) {
    return <ErrorBlock error={error} />;
  }

  return (
    <>
      <CssBaseline />
      <Container className={classes.root} maxWidth="lg">
        <Grid container spacing={3}>
          {!finished ? (
            <QuizCard />
          ) : (
            <>
              <QuizResultStats resultStats={resultStats}></QuizResultStats>
              {questionsData.map((questionData) => (
                <QuizResultCard key={questionData.question} questionData={questionData} />
              ))}
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};
