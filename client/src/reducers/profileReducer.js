import {
  PROFILE_LOADING,
  GET_PROFILE,
  VIEW_PROFILE,
  GET_FOLLOWERS,
  GET_FOLLOWING
} from "../actions/types";
import isEmpty from "./is-empty";

const initialState = {
  profile: null,
  loading: false,
  followers: [],
  following: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload
      };
    case GET_FOLLOWING:
      return {
        ...state,
        following: action.payload
      };

    default:
      return state;
  }
}
