import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import promotionReducer from "./promotionReducer";
import orderReducer from "./orderReducer";
import dashboardReducer from "./dashboardReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  promotion: promotionReducer,
  order: orderReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
