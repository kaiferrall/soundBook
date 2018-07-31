import { GET_ERRORS, SEARCH_ALBUMS } from "./types";
import axios from "axios";

export const searchAlbums = search => dispatch => {
  axios
    .post("http://localhost:5000/api/searches/albums", search)
    .then(res =>
      dispatch({
        type: SEARCH_ALBUMS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};
