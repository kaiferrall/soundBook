import { SET_CURRENT_USER, GET_ERRORS } from "../actions/types";
import isEmpty from "./is-empty";
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload.auth,
        user: action.payload.user
      };
    default:
      return state;
  }
}
