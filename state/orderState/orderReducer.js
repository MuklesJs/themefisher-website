export const orderReducer = (state, action) => {
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
        orders: action.payload,
        id: action.payload?._id,
        error: false,
        success: true,
      };

    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "ADD_ORDER":
      return {
        ...state,
        orders: action.payload.order,
        subtotal: action.payload.subtotal,
        discount: action.payload.discount,
      };

    case "ADD_COUPON":
      return {
        ...state,
        coupon: action.payload,
      };

    case "ADD_LOADING":
      return {
        ...state,
        loading: action.payload.loading,
      };

    default:
      return state;
  }
};
