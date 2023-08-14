import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage.jsx';
import App from './App.jsx';
import LoginForm from './Login.jsx';
import RegisterForm from "./Register.jsx";
import ForgotPasswordPage from "./ForgotPasswordPage.jsx";
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "login",
    element: <LoginForm />
  },
  {
    path: "register",
    element: <RegisterForm />
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
