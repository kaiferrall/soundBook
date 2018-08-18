import {
  SEARCH_ALBUMS,
  FIND_PROFILES,
  PROFILE_MUSIC_ALBUMS,
  PROFILE_MUSIC_ARTISTS,
  CLEAR_MUSIC,
  CLEAR_PROFILE_SEARCH
} from "../actions/types";
const initialState = {
  albums: [],
  artists: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_MUSIC_ALBUMS:
      return {
        ...state,
        albums: action.payload
      };
    case PROFILE_MUSIC_ARTISTS:
      return {
        ...state,
        artists: action.payload
      };
    case CLEAR_MUSIC:
      return {
        albums: []
      };
    default:
      return state;
  }
}
