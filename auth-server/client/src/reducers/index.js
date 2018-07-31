import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import searchReducer from "./searchReducer";
import postsReducer from "./postsReducer";
import findReducer from "./findReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  posts: postsReducer,
  searches: searchReducer,
  find: findReducer
});
