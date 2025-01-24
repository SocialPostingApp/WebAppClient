import { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

const TOAST_LIMIT = 1;

function App() {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible) 
      .filter((_, i) => i >= TOAST_LIMIT) 
      .forEach((t) => toast.dismiss(t.id)); 
  }, [toasts]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App;
