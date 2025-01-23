import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import Lottie from "react-lottie";
import BooksAnimation from "./books-animation.json";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    try {
      navigate("/", { replace: true });
    } catch (err) {
      toast.error("Incorrect email or password.\nPlease try again");
    }
  };

  return (
    <div className="h-[100vh] bg-primary flex items-center justify-center flex flex-col font-display">
      <div className="w-[500px] bg-white rounded-[20px] drop-shadow-lg py-[30px] px-[50px]">
        <div className="text-center mb-5 text-primary">
          <Lottie
            isClickToPauseDisabled
            options={{ animationData: BooksAnimation }}
            style={{ width: 400, height: 200 }}
          />
          <p className="opacity-60">welcome to</p>
          <h1 className="font-bold text-4xl">READIT</h1>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="block mb-2 text-sm text-gray-700">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 px-3 py-2 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeIcon className="h-4 w-4 text-black" />
              ) : (
                <EyeSlashIcon className="h-4 w-4 text-black" />
              )}
            </div>
          </div>
        </div>

        <button onClick={login} className="mt-4 w-full">
          Login
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
