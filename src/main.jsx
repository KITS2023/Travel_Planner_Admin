// import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import ForgotPasswordPage from "./ForgotPasswordPage";
import Flights from "./components/Flights";
import Accommodations from "./components/Accommodations";
import Activities from "./components/Activities";
import Users from "./components/Users";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/Profile";
import "./style/index.css";
import Destinations from "./components/Destinations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "flights",
        element: <Flights />,
      },
      {
        path: "accommodations",
        element: <Accommodations />,
      },
      {
        path: "activities",
        element: <Activities />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "destinations",
        element: <Destinations />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/resetPassword",
    element: <ForgotPasswordPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
