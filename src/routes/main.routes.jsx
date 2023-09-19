import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import AddProductForm from "../pages/AddProductForm";
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
        element: <AddProductForm />,
      },
      {
        path: "product/edit/:id",
        element: <p>Hello</p>,
      },
    ],
  },
];
