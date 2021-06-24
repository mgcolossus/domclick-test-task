import { combineReducers } from "redux";
import { quizDataReducer } from "./quizReducer";

export const rootReducer = combineReducers({
  quizData: quizDataReducer
});

export type RootState = ReturnType<typeof rootReducer>;
