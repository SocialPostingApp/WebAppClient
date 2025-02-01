import { createBrowserRouter, redirect } from 'react-router-dom';
import Login from '../views/login/Login';
import Feed from '../views/feed/Feed';
import Register from '../views/register/Register';
import Comments from '../views/comments/Comments';
import { getAllPosts, getPostsByUserId } from '../services/postService';

const authLoader = async () => {
  // AUTH LOGIC
  // REDIRECT TO LOGIN PAGE IF NOT AUTHENTICATED
  return redirect('/home');
};

export const router = createBrowserRouter([
  {
    path: '/home',
    element: <Feed key="home" getPosts={getAllPosts} />,
  },
  {
    path: '/profile',
    element: (
      <Feed key="profile" isProfile={true} getPosts={getPostsByUserId} />
    ),
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
