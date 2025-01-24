import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../views/login/Login";
import Feed from "../views/feed/Feed";

const authLoader = async () => {
  // AUTH LOGIC
  // REDIRECT TO LOGIN PAGE IF NOT AUTHENTICATED
  return redirect("/");
};

export const router = createBrowserRouter([
  {
    path: "/", 
    element: <Feed/>, 
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
