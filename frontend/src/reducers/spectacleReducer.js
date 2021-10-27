import { GET_SPECTACLES_SUCCESS, GET_SPECTACLES_ERROR } from "../actions/actionTypes";

const initialState = {
  spectacles: [],
  spectacle: {},
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SPECTACLES_SUCCESS:
      return {
        ...state,
        spectacles: action.payload,
      };

    case GET_SPECTACLES_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}

