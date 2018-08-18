import {
  PROFILE_LOADING,
  GET_PROFILE,
  VIEW_PROFILE,
  VIEW_FOLLOWING,
  VIEW_FOLLOWERS,
  VIEW_ALBUMS,
  VIEW_ARTISTS,
  CLEAR_VIEW_MUSIC,
  VIEW_PROFILE_LOADING
} from "../actions/types";
import isEmpty from "./is-empty";

const initialState = {
  profile: null,
  loading: false,
  followers: [],
  following: [],
  albums: [],
  artists: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VIEW_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case VIEW_PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case VIEW_FOLLOWING:
      return {
        ...state,
        following: action.payload
      };
    case VIEW_FOLLOWERS:
      return {
        ...state,
        followers: action.payload
      };
    case VIEW_ALBUMS:
      return {
        ...state,
        albums: action.payload
      };
    case VIEW_ARTISTS:
      return {
        ...state,
        artists: action.payload
      };
    case CLEAR_VIEW_MUSIC:
      return {
        albums: [],
        artists: []
      };
    default:
      return state;
  }
}
