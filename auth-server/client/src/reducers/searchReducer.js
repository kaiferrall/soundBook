import { SEARCH_ALBUMS, FIND_PROFILES } from "../actions/types";
const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ALBUMS:
      return action.payload;

    default:
      return state;
  }
}