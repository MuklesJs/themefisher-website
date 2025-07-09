export const downloadReducer = (state, action) => {
  switch (action.type) {
    case "FETCHING_START":
      return {
        ...state,
        loading: true,
        error: false,
      };

    case "FETCHING_SUCCESS":
      return {
        ...state,
        loading: false,
        downloads: action.payload,
        id: action.payload?._id,
        error: false,
      };

    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
