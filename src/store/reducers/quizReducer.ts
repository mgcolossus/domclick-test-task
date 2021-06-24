import { QuizData, QuizDataAction, QuizDataActionTypes } from "../../types/quizData";

const initialState: QuizData = {
  questionsData: [],
  currentQuestionIndex: 0,
  resultStats: null,
  finished: false,
  loading: false,
  error: null
};

function getDifficultyNumberValue(strValue: string): number {
  switch (strValue) {
    case "easy":
      return 1;
    case "medium":
      return 2;
    case "hard":
      return 3;
    default:
      throw Error("Unexpected value");
  }
}

export const quizDataReducer = (state = initialState, action: QuizDataAction): QuizData => {
  switch (action.type) {
    case QuizDataActionTypes.FETCH_QUIZ_DATA:
      return { ...initialState, loading: true };
    case QuizDataActionTypes.QUIZ_DATA_FETCH_SUCCESS:
      return {
        ...initialState,
        questionsData: action.payload,
        currentQuestionIndex: 0
      };
    case QuizDataActionTypes.QUIZ_DATA_FETCH_ERROR:
      return { ...initialState, error: action.payload };
    case QuizDataActionTypes.CHANGE_ANSWER_FOR_CURRENT_QUESTION: {
      const newQuestionsData = [...state.questionsData];
      newQuestionsData[state.currentQuestionIndex] = {
        ...newQuestionsData[state.currentQuestionIndex],
        userAnswer: action.payload
      };
      return {
        ...state,
        questionsData: newQuestionsData
      };
    }
    case QuizDataActionTypes.GO_TO_NEXT_QUESTION:
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
    case QuizDataActionTypes.PREPARE_QUIZ_RESULTS: {
      const questionsSortedByDifficulty = [...state.questionsData].sort(
        (a, b) => getDifficultyNumberValue(a.difficulty) - getDifficultyNumberValue(b.difficulty)
      );
      const resultStats = {
        questionsCount: questionsSortedByDifficulty.length,
        correctCount: 0,
        easyCorrect: 0,
        easyAll: 0,
        mediumCorrect: 0,
        mediumAll: 0,
        hardCorrect: 0,
        hardAll: 0
      };
      questionsSortedByDifficulty.forEach((questionData) => {
        if (questionData.userAnswer === questionData.correct_answer) {
          resultStats.correctCount += 1;
        }
        switch (questionData.difficulty) {
          case "easy":
            resultStats.easyAll += 1;
            if (questionData.userAnswer === questionData.correct_answer) {
              resultStats.easyCorrect += 1;
            }
            break;
          case "medium":
            resultStats.mediumAll += 1;
            if (questionData.userAnswer === questionData.correct_answer) {
              resultStats.mediumCorrect += 1;
            }
            break;
          case "hard":
            resultStats.hardAll += 1;
            if (questionData.userAnswer === questionData.correct_answer) {
              resultStats.hardCorrect += 1;
            }
            break;
          default:
            throw Error("Unexpected value");
        }
      });
      return { ...state, finished: true, questionsData: questionsSortedByDifficulty, resultStats: resultStats };
    }
    default:
      return state;
  }
};
