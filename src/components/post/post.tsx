import React from 'react';
import { IPost } from '../../models/index';
import { CiStar, CiHeart } from 'react-icons/ci';
import { FaRegComment } from 'react-icons/fa';
import './style.css';
import { useNavigate } from 'react-router-dom';
import MyImage from './book.jpg';
import { useQuery } from 'react-query';
import { getCommentsCountByPost } from '../../services/commentService';

interface IProps {
  post: IPost;
}

const Post: React.FC<IProps> = ({ post }) => {
  const navigate = useNavigate();
  const { data: commentsCount } = useQuery<number>(
    ['commentCount', post._id],
    () => getCommentsCountByPost(post._id)
  );

  const handleClick = (): void => {
    navigate(`/comments/${post._id}`);
  };

  return (
    <div className="post-container">
      <div className="user-name-row">
        <div className="user-name">
          {post.title} - {post.owner.name}'s review
        </div>
      </div>
      <div className="review-container">
        <div className="review">{post.review}</div>
      </div>
      <div className="photo">
        <img
          src={
            post.image
              ? `${import.meta.env.VITE_REACT_APP_API_URL}/uploads/${
                  post.image
                }`
              : MyImage
          }
          alt="Uploaded File"
        />
      </div>
      <div className="post-details-container">
        <div className="reactions-container">
          <div className="likes reaction-item">
            <CiHeart className="icon" />
            <div className="item-number">{post.likesCount ?? 0}</div>
          </div>
          <div className="comments reaction-item" onClick={handleClick}>
            <FaRegComment className="icon" />
            <div className="item-number">{commentsCount ?? 0}</div>
          </div>
        </div>
        <div className="rate reaction-item">
          <div>{post.rate ?? 0}/5</div>
          <CiStar className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Post;
