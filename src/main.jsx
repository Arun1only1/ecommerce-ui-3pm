import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { loginRoutes } from "./routes/login.routes";
import { mainRoutes } from "./routes/main.routes";
import { Provider } from "react-redux";
import reduxStore from "./store";

const router = createBrowserRouter([...loginRoutes, ...mainRoutes]);
// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
