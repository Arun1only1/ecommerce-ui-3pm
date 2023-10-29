import GuestGuard from "../guards/GuestGuard";
import MinimumLayout from "../layout/MinimumLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const loginRoutes = [
  {
    path: "/",
    element: (
      <GuestGuard>
        <MinimumLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];
