import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILED,
	USER_LOGOUT,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAILED:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

// export const productDetailsReducer = (
// 	state = { product: { review: [] } },
// 	action
// ) => {
// 	switch (action.type) {
// 		case PRODUCT_DETAIL_REQUEST:
// 			return { loading: true, ...state };

// 		case PRODUCT_DETAIL_SUCCESS:
// 			return { loading: false, product: action.payload };
// 		case PRODUCT_DETAIL_FAILED:
// 			return { loading: false, error: action.payload };
// 		default:
// 			return state;
// 	}
// };
