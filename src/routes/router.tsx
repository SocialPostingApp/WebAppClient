import { createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";

const authLoader = async () => {
  // AUTH LOGIC
  // REDIRECT TO LOGIN PAGE IF NOT AUTHENTICATED
  return redirect("/");
};

export const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />, 
    loader: authLoader,
    children: [
    ],
  }
]);
