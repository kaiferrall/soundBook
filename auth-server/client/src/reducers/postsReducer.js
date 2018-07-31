import {
  GET_ALL_POSTS,
  GET_ERRORS,
  FEED_LOADING,
  CLEAR_POSTS
} from "../actions/types";
import isEmpty from "./is-empty";
const initialState = {
  posts: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case FEED_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_POSTS:
      return {
        ...state,
        posts: []
      };
    default:
      return state;
  }
}
