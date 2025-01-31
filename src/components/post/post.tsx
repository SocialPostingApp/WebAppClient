import React from 'react';
import { IPost, IUser } from '../../models/index';
import { CiStar, CiHeart } from 'react-icons/ci';
import { FaRegComment } from 'react-icons/fa';
import './style.css';
import { useNavigate } from 'react-router-dom';
import MyImage from './book.jpg';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getCommentsCountByPost } from '../../services/commentService';
import { useAppContext } from '../../context/appContext';
import { addLike, getLikedUserIds } from '../../services/likeService';

interface IProps {
  post: IPost;
}

const Post: React.FC<IProps> = ({ post }) => {
  const navigate = useNavigate();
  const { userId } = useAppContext();
  const postId = post._id;
  const queryClient = useQueryClient();

  const { data: commentsCount } = useQuery<number>(
    ['commentCount', postId],
    () => getCommentsCountByPost(postId)
  );

  const { data: likedUserIds } = useQuery<IUser['_id'][]>(
    ['likes', postId],
    () => getLikedUserIds(postId)
  );

  const addLikeMutation = useMutation(
    async () => {
      if (!postId) throw new Error('Post ID not found');
      return addLike(postId, userId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['likes', postId]);
      },
      onError: (error) => {
        console.error('Error adding comment:', error);
      },
    }
  );

  const handleCommentsClick = (): void => {
    navigate(`/comments/${postId}`);
  };

  const handleLikesClick = (): void => {
    addLikeMutation.mutate();
  };

  return (
    <div className="post-container">
      <div className="user-name-row">
        <div className="user-name">{post.owner.name}'s review</div>
      </div>
      <div className="review-container">
        <div className="review">{post.review}</div>
      </div>
      {/* <div className="photo">{post.image}</div> */}

      <img src={MyImage} className="photo" />
      <div className="post-details-container">
        <div className="reactions-container">
          <div className="likes reaction-item" onClick={handleLikesClick}>
            <CiHeart className="icon" />
            <div className="clickable item-number">
              {likedUserIds?.length ?? 0}
            </div>
          </div>
          <div
            className="clickable reaction-item"
            onClick={handleCommentsClick}
          >
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
