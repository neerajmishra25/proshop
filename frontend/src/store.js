import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
	userLoginReducer,
	userReigsterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
} from "./reducers/userReducers";

import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	myOrdersListReducer,
	ordersListReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
	productList: productListReducer,
	productCreate: productCreateReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productUpdate: productUpdateReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userReigsterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	myOrdersList: myOrdersListReducer,
	ordersList: ordersListReducer,
});
const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const userShippingInfoFromStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};

const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: userShippingInfoFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
