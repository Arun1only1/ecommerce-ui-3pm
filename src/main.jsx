import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loginRoutes } from "./routes/login.routes";
import { mainRoutes } from "./routes/main.routes";

const router = createBrowserRouter([...loginRoutes, ...mainRoutes]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
