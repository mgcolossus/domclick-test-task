import { Dispatch } from "redux";
import { QuizDataAction, QuizDataActionTypes } from "../../types/quizData";
import { shuffle } from "./../../utils/index";

export const fetchQuizData = () => {
  return async (dispatch: Dispatch<QuizDataAction>) => {
    try {
      dispatch({ type: QuizDataActionTypes.FETCH_QUIZ_DATA });
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      const responseData = await response.json();
      const questionsData = responseData.results.map((questionData: any) => ({
        ...questionData,
        userAnswer: "",
        answerOptionsToShow: shuffle([questionData.correct_answer, ...questionData.incorrect_answers])
      }));
      dispatch({
        type: QuizDataActionTypes.QUIZ_DATA_FETCH_SUCCESS,
        payload: questionsData
      });
    } catch (error) {
      dispatch({
        type: QuizDataActionTypes.QUIZ_DATA_FETCH_ERROR,
        payload: "Some error occured"
      });
    }
  };
};

export const changeAnswerForCurrentQuestion = (value: string): QuizDataAction => ({
  type: QuizDataActionTypes.CHANGE_ANSWER_FOR_CURRENT_QUESTION,
  payload: value
});

export const goToNextQuestion = (): QuizDataAction => ({ type: QuizDataActionTypes.GO_TO_NEXT_QUESTION });
export const prepareQuizResults = (): QuizDataAction => ({ type: QuizDataActionTypes.PREPARE_QUIZ_RESULTS });
