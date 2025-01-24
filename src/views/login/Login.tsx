import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import Lottie from "react-lottie";
import BooksAnimation from "./books-animation.json";
import {
  googleSignIn,
  login as loginRequest,
  saveTokens
} from "../../services/authService";
import { useMutation } from "react-query";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      loginRequest(email, password)
  );

  const login = async () => {
    try {
      const { data: loginRes } = await loginMutation.mutateAsync({
        email,
        password,
      });
      saveTokens({
        accessToken: loginRes.accessToken,
        refreshToken: loginRes.refreshToken,
      });
      
      toast.success("Logged in successfully");

      navigate("/", { replace: true });
    } catch (err) {
      toast.error("Incorrect email or password.\nPlease try again");
    }
  };

  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const response = await googleSignIn(credentialResponse);
      const { data: loginGoogleRes } = response;

      saveTokens({
        accessToken: loginGoogleRes.accessToken,
        refreshToken: loginGoogleRes.refreshToken,
      });

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const onGoogleLoginFailure = () => {
    toast.error("Sorry, we have an issue logging with Google");
  };

  return (
    <div className="h-[100vh] bg-primary flex items-center justify-center flex flex-col font-display">
      <div className="w-[500px] bg-white rounded-[20px] drop-shadow-lg py-[30px] px-[50px]">
        <div className="text-center mb-5 text-primary">
          <Lottie
            isClickToPauseDisabled
            options={{ animationData: BooksAnimation }}
            style={{ width: 400, height: 100 }}
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
        <div className="mb-6 mt-5 flex items-center">
          <div className="divider" />
          <span className="whitespace-pre text-[14px] mx-2">or login with</span>
          <div className="divider" />
        </div>
        <div className="flex gap-2 justify-center">
          <GoogleLogin
            onSuccess={onGoogleLoginSuccess}
            onError={onGoogleLoginFailure}
          />
        </div>
        <div className="text-center pt-8 text-sm">
          <p>
            {" "}
            Don't have an account yet?{" "}
            <Link to="/register" replace className="underline">
              register here
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
