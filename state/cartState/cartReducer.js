export const cartReducer = (state, action) => {
  switch (action.type) {
    case "FETCHING_START":
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };

    case "FETCHING_SUCCESS":
      return {
        ...state,
        loading: false,
        carts: action.payload?.products || [],
        id: action.payload?._id,
        error: false,
        success: true,
      };

    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
      };

    case "ADD_CART":
      return {
        ...state,
        carts: action.payload,
      };

    case "ADD_COUPON":
      return {
        ...state,
        coupon: action.payload,
      };

    case "CHANGE_SUPPORT":
      return {
        ...state,
        support: action.payload,
      };

    case "CHANGE_SERVICE":
      return {
        ...state,
        service: action.payload,
      };

    case "CHANGE_DISCOUNT_CODE":
      return {
        ...state,
        discountCode: action.payload,
      };

    case "CHANGE_DISCOUNT_FORM":
      return {
        ...state,
        discountForm: action.payload,
      };

    case "CHANGE_DISCOUNT_AMOUNT":
      return {
        ...state,
        discountAmount: action.payload,
      };

    default:
      return state;
  }
};
