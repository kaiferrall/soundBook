import { GET_THREADS, GET_THREAD } from "../actions/types";
const initialState = {
  threads: [],
  thread: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_THREADS:
      return {
        ...state,
        threads: action.payload
      };
    case GET_THREAD:
      return {
        ...state,
        thread: action.payload
      };
    default:
      return state;
  }
}
