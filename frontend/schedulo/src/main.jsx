import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.jsx";
import NewEvent from "./routes/NewEvent.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./routes/Register.jsx";
import Login from "./routes/Login.jsx";
import MyEvents from "./routes/MyEvents.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/new-event",
        element: <NewEvent />,
      },
      {
        path: "/my-events",
        element: <MyEvents />,
      },
      {
        path: "/update-event/:id",
        element: <NewEvent />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
