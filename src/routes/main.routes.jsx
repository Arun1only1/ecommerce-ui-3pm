import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import AddProduct from "../pages/AddProduct";
import Home from "../pages/Home";
import Product from "../pages/Product";

export const mainRoutes = [
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "product/add",
        element: <AddProduct />,
      },
    ],
  },
];
