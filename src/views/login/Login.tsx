import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';
import Lottie from 'react-lottie';
import BooksAnimation from './books-animation.json';
import {
  googleSignIn,
  login as loginRequest,
  saveTokens,
} from '../../services/authService';
import { useMutation } from 'react-query';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useAppContext } from '../../context/appContext';

function Login() {
  const navigate = useNavigate();
  const { setUserId } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

      localStorage.setItem('userId', loginRes.user._id);
      setUserId(loginRes.user._id);

      toast.success('Logged in successfully');

      navigate('/', { replace: true });
    } catch (err) {
      toast.error('Incorrect email or password.\nPlease try again');
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

      localStorage.setItem('userId', loginGoogleRes.user._id);
      setUserId(loginGoogleRes.user._id);

      navigate('/', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const onGoogleLoginFailure = () => {
    toast.error('Sorry, we have an issue logging with Google');
  };

  return (
    <div className="custom-container">
      <div className="login-custom-box">
        <div className="custom-text">
          <Lottie
            isClickToPauseDisabled
            options={{ animationData: BooksAnimation }}
            style={{ width: 400, height: 100 }}
          />
          <p className="welcome-text">Welcome to</p>
          <h1 className="font-bold-4xl">READIT</h1>
        </div>
        <div className="input-group">
          <label htmlFor="email" className="custom-label">
            Email
          </label>
          <input
            id="email"
            className="custom-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="custom-label">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              className="custom-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute-inset-right"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeIcon className="icon" />
              ) : (
                <EyeSlashIcon className="icon" />
              )}
            </div>
          </div>
        </div>

        <button onClick={login} className="custom-button">
          Login
        </button>
        <div className="divider-container">
          <div className="divider" />
          <span className="divider-text">or login with</span>
          <div className="divider" />
        </div>
        <div className="google-login-container">
          <GoogleLogin
            onSuccess={onGoogleLoginSuccess}
            onError={onGoogleLoginFailure}
          />
        </div>
        <div className="register-text">
          <p>
            Don't have an account yet?{' '}
            <Link to="/register" replace className="underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
