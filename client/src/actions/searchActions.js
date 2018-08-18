import {
  GET_ERRORS,
  SEARCH_ALBUMS,
  SEARCH_ARTISTS,
  CLEAR_SEARCH,
  SEARCH_SONGS
} from "./types";
import axios from "axios";

export const searchAlbums = search => dispatch => {
  console.log(search);
  if (search.type === "artists") {
    axios
      .post("http://localhost:5000/api/searches/artists", search)
      .then(res =>
        dispatch({
          type: SEARCH_ARTISTS,
          payload: res.data
        })
      )
      .catch(err => console.log(err));
  } else if (search.type === "albums") {
    axios
      .post("http://localhost:5000/api/searches/albums", search)
      .then(res =>
        dispatch({
          type: SEARCH_ALBUMS,
          payload: res.data
        })
      )
      .catch(err => console.log(err));
  } else if (search.type === "songs") {
    axios
      .post("http://localhost:5000/api/searches/songs", search)
      .then(res =>
        dispatch({
          type: SEARCH_SONGS,
          payload: res.data
        })
      )
      .catch(err => console.log(err));
  }
};

export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH
  };
};
