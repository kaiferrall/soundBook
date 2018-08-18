import { GET_ERRORS, GET_FIND_ERRORS, CLEAR_ERRORS } from "../actions/types";
const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case GET_FIND_ERRORS:
      return {
        ...state,
        findError: action.payload
      };
    case CLEAR_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
