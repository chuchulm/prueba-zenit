import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { cartReducer } from './reducers/cartReducer';
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
  orderSummaryReducer,
} from './reducers/orderReducer';
import {
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailReducer,
  ProductListReducer,
  productUpdateReducer,
} from './reducers/productReducers';
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninGoogleReducer,
  userSigninReducer,
  userSigninWithGoogleReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducer';

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },

  userSigninGoogle: {
    userInfo: localStorage.getItem('userInfoGoogle')
      ? JSON.parse(localStorage.getItem('userInfoGoogle'))
      : null,
  },

  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},

    paymentMethod: 'paypal',
  },
};

const reducers = combineReducers({
  productList: ProductListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  // userSigninGoogle: userSigninGoogleReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userlist: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  productCategoryList: productCategoryListReducer,
  orderSummary: orderSummaryReducer,
});

const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;
