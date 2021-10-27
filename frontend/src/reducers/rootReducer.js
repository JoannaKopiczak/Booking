import { combineReducers } from "redux";
import authReducer from "./authReducer";
import spectacleReducer from "./spectacleReducer";
import genreReducer from "./genreReducer";

export default combineReducers({
  auth: authReducer,
  spectacle: spectacleReducer,
  genre: genreReducer,
});
