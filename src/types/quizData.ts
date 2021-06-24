export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  userAnswer: string;
  answerOptionsToShow: string[];
}

export interface ResultStats {
  questionsCount: number;
  correctCount: number;
  easyCorrect: number;
  easyAll: number;
  mediumCorrect: number;
  mediumAll: number;
  hardCorrect: number;
  hardAll: number;
}

export interface QuizData {
  questionsData: Question[];
  currentQuestionIndex: number;
  finished: boolean;
  resultStats: null | ResultStats;
  loading: boolean;
  error: null | string;
}

export enum QuizDataActionTypes {
  FETCH_QUIZ_DATA = "FETCH_QUIZ_DATA",
  QUIZ_DATA_FETCH_SUCCESS = "QUIZ_DATA_FETCH_SUCCESS",
  QUIZ_DATA_FETCH_ERROR = "QUIZ_DATA_FETCH_ERROR",
  CHANGE_ANSWER_FOR_CURRENT_QUESTION = "CHANGE_ANSWER_FOR_CURRENT_QUESTION",
  GO_TO_NEXT_QUESTION = "GO_TO_NEXT_QUESTION",
  PREPARE_QUIZ_RESULTS = "PREPARE_QUIZ_RESULTS"
}

interface FetchQuizData {
  type: QuizDataActionTypes.FETCH_QUIZ_DATA;
}

interface QuizDataFetchSuccess {
  type: QuizDataActionTypes.QUIZ_DATA_FETCH_SUCCESS;
  payload: Question[];
}

interface QuizDataFetchError {
  type: QuizDataActionTypes.QUIZ_DATA_FETCH_ERROR;
  payload: string;
}

interface ChangeAnswerForCurrentQuestion {
  type: QuizDataActionTypes.CHANGE_ANSWER_FOR_CURRENT_QUESTION;
  payload: string;
}

interface GoToNextQuestion {
  type: QuizDataActionTypes.GO_TO_NEXT_QUESTION;
}

interface PrepareQuizResults {
  type: QuizDataActionTypes.PREPARE_QUIZ_RESULTS;
}

export type QuizDataAction =
  | FetchQuizData
  | QuizDataFetchSuccess
  | QuizDataFetchError
  | ChangeAnswerForCurrentQuestion
  | GoToNextQuestion
  | PrepareQuizResults;
