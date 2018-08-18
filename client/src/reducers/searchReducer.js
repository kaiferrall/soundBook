import {
  SEARCH_ALBUMS,
  SEARCH_SONGS,
  SEARCH_ARTISTS,
  CLEAR_SEARCH,
  FIND_PROFILES
} from "../actions/types";
const initialState = {
  results: [],
  type: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ALBUMS:
      return {
        results: action.payload,
        type: "albums"
      };
    case SEARCH_ARTISTS:
      return {
        results: action.payload,
        type: "artists"
      };
    case SEARCH_SONGS:
      return {
        results: action.payload,
        type: "songs"
      };
    case CLEAR_SEARCH:
      return {
        results: [],
        type: ""
      };
    default:
      return state;
  }
}
