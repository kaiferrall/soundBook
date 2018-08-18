import {
  SEARCH_ALBUMS,
  FIND_PROFILES,
  CLEAR_PROFILE_SEARCH
} from "../actions/types";
const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case FIND_PROFILES:
      return action.payload;
    case CLEAR_PROFILE_SEARCH:
      return initialState;
    default:
      return state;
  }
}
