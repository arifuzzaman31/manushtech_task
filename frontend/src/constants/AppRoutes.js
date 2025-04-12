import SignIn from "../pages/Auth/SignIn";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProductList from "../pages/Products/ProductList";
import ProductForm from "../pages/Products/ProductForm";
import * as urls from "./AppUrls";
import PromotionList from "../pages/Promotions/PromotionList";
import { createPromotion } from "../services/promotionService";
import CreatePromotion from "../pages/Promotions/CreatePromotion";
import EditPromotion from "../pages/Promotions/EditPromotion";
import OrderList from "../pages/Orders/OrderList";
import CreateOrder from "../pages/Orders/CreateOrder";

// Create separate components in their own files
// Move these to their respective component files if you prefer

const route = [
  // UNPROTECTED ROUTES
  {
    path: urls.SIGNIN,
    Element: SignIn,
    isIndexUrl: true,
    isProtected: false,
  },
  // PROTECTED ROUTES
  {
    path: urls.DASHBOARD,
    Element: Dashboard,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.PRODUCTS,
    Element: ProductList,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.CREATE_PRODUCT,
    Element: () => ProductForm({ isEdit: false }),
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.EDIT_PRODUCT,
    Element: (props) => ProductForm({ isEdit: true, ...props }),
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.PROMOTIONS,
    Element: PromotionList,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.CREATE_PROMOTION,
    Element: CreatePromotion,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.EDIT_PROMOTION,
    Element: EditPromotion,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.ORDERS,
    Element: OrderList,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.CREATE_ORDER,
    Element: CreateOrder,
    isIndexUrl: false,
    isProtected: true,
  },
];

export default route;
