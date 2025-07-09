export const userReducer = (state, action) => {
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
        users: action.payload,
        id: action.payload?._id,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "ADD_USER":
      return {
        ...state,
        users: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: {
          ...state.users,
          email: action.payload.email,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          country: action.payload.country,
          state: action.payload.state,
        },
      };

    case "UPDATE_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "ADD_LOADING":
      return {
        ...state,
        loading: action.payload.loading,
      };
    case "ADD_ID":
      return {
        ...state,
        id: action.payload,
      };
    case "ADD_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};
