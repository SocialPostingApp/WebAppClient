import React from 'react';
import { IPost } from '../../models/index';
import { CiStar, CiHeart } from 'react-icons/ci';
import { FaRegComment } from 'react-icons/fa';
import './style.css';
import { useNavigate } from 'react-router-dom';

interface IProps {
  post: IPost;
}

const Post: React.FC<IProps> = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(`/comments/${post._id}`);
  };

  return (
    <div className="post-container">
      <div className="user">{post.owner.name}</div>
      <div className="review">{post.review}</div>
      <div className="photo">{post.image}</div>
      <div className="post-details-container">
        <div className="reactions-container">
          <div className="likes reaction-item">
            <CiHeart />
            <div>{post.likesCount ?? 0}</div>
          </div>
          <div className="comments reaction-item" onClick={handleClick}>
            <FaRegComment />
            <div>12</div>
          </div>
        </div>
        <div className="rate reaction-item">
          <CiStar />
          <div>{post.rate ?? 0}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
