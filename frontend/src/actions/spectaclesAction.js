import Axios from "axios";
import { GET_SPECTACLES_SUCCESS, GET_SPECTACLES_ERROR } from "./actionTypes";

export const getSpectacles = () => {
  return async (dispatch) => {
    try {
      const result = await Axios.get("/api/spectacles");
      dispatch({ type: GET_SPECTACLES_SUCCESS, payload: result.data.spectacles });
    } catch (error) {
      dispatch({ type: GET_SPECTACLES_ERROR, error });
    }
  };
};

export const addSpectacle = (spectacle) => {
  const contentType = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  let formData = new FormData();
  formData.append("title", spectacle.title);
  //formData.append("numberInStock", spectacle.numberInStock);
  formData.append("genre", spectacle.genre);
  formData.append("image", spectacle.image);

  return async (dispatch) => {
    try {
      const result = await Axios.post(
        "/api/spectacles/addspectacle",
        formData,
        contentType
      );
      dispatch({ type: GET_SPECTACLES_SUCCESS, payload: result.data.spectacles });
    } catch (error) {
      dispatch({ type: GET_SPECTACLES_ERROR, error });
    }
  };
};

