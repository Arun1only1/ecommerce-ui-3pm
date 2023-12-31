import AuthGuard from "../guards/AuthGuard";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import AddProductForm from "../pages/AddProductForm";
import Cart from "../pages/Cart";
import EditProduct from "../pages/EditProduct";
import Home from "../pages/Home";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";

export const mainRoutes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
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
        path: "product/detail/:productId",
        element: <ProductDetail />,
      },
      {
        path: "product/edit/:id",
        element: <EditProduct />,
      },
      { path: "/cart", element: <Cart /> },
    ],
  },
];
