import Home from "../pages/Home";
import ProductList from "../pages/BuyerProductList";
import BuyerProductList from "../pages/BuyerProductList";
import SellerProductList from "../pages/SellerProductList";

export const mainRoutes = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/product",
    element: <SellerProductList />,
  },
];
