import { createBrowserRouter, redirect } from 'react-router-dom';
import Login from '../views/login/Login';
import Feed from '../views/feed/Feed';
import Register from '../views/register/Register';
import Comments from '../views/comments/Comments';
import { getTokens } from '../services/authService';
import { getAllPosts, getPostsByUserId } from '../services/postService';
import { Routes } from '../models/enums/routes';
import EditProfile from '../views/editProfile/editProfile';

const authLoader = async () => {
  const tokens = getTokens();
  if (tokens.accessToken && tokens.refreshToken) {
    return null;
  }
  return redirect(Routes.LOGIN);
};

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect(Routes.HOME),
  },
  {
    path: Routes.HOME,
    loader: authLoader,
    element: <Feed key="home" getPosts={getAllPosts} />,
  },
  {
    path: Routes.PROFILE,
    element: (
      <Feed key="profile" isProfile={true} getPosts={getPostsByUserId} />
    ),
  },
  {
    path: Routes.LOGIN,
    element: <Login />,
  },
  {
    path: Routes.REGISTER,
    element: <Register />,
  },
  {
    path: `${Routes.COMMENTS}/:postId`,
    element: <Comments />,
  },
  {
    path: `${Routes.EDIT_PROFILE}`,
    element: <EditProfile />,
  },
]);
