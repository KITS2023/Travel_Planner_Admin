import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './error-page.jsx'
import App from './App.jsx'
import { Login, LoginForm } from './login.jsx'
import { Register, RegisterForm } from "./register.jsx";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loginElement: <Login />,
    registerElement: <Register />
  },
  {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/register",
    element: <RegisterForm />
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
