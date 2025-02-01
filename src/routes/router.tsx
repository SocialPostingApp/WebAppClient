import { createBrowserRouter, redirect } from 'react-router-dom';
import Login from '../views/login/Login';
import Feed from '../views/feed/Feed';
import Register from '../views/register/Register';
import Comments from '../views/comments/Comments';
import { getTokens } from '../services/authService';

const authLoader = async () => {
  const tokens = getTokens();
  if (tokens.accessToken && tokens.refreshToken) {
    return null;
  }
  return redirect('/login');
};

export const router = createBrowserRouter([
  {
    path: '/',
    loader: authLoader,
    element: <Feed />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/comments/:postId',
    element: <Comments />,
  },
]);
