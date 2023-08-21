// import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import LoginForm from "./Login";
import RegisterForm from "./register";
import ForgotPasswordPage from "./ForgotPasswordPage";
import Flights from "./components/Flights";
import Accomodations from "./components/Accomodations";
import Activities from "./components/Activities";
import Users from "./components/Users";
import Comments from "./components/Comments";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/Profile";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard/>,
      },
      {
        path: "flights",
        element: <Flights />,
      },
      {
        path: "accomodations",
        element: <Accomodations />,
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
        path: "comments",
        element: <Comments />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
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
