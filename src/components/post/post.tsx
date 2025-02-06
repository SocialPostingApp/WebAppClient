import React, { useMemo, useState } from 'react';
import { IPost, IUser } from '../../models/index';
import { CiStar, CiHeart } from 'react-icons/ci';
import { FaRegComment, FaHeart, FaTrashAlt, FaEdit } from 'react-icons/fa';
import './style.css';
import { useNavigate } from 'react-router-dom';
import MyImage from './book.jpg';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getCommentsCountByPost } from '../../services/commentService';
import { useAppContext } from '../../context/appContext';
import {
  addLike,
  getLikedUserIds,
  removeLike,
} from '../../services/likeService';
import toast from 'react-hot-toast';
import { deletePost } from '../../services/postService';
import EditPost from '../editPost/EditPost';
import GeminiReccomendation from '../geminiReccomendation/GeminiReccomendation';

interface IProps {
  post: IPost;
  isProfile?: boolean;
}

const Post: React.FC<IProps> = ({ post, isProfile = false }) => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const postId = post._id;
  const queryClient = useQueryClient();
  const [isGeminiModalOpen, setIsGeminiModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: commentsCount } = useQuery<number>(
    ['commentCount', postId],
    () => getCommentsCountByPost(postId)
  );

  const { data: likedUserIds } = useQuery<IUser['_id'][]>(
    ['likes', postId],
    () => getLikedUserIds(postId)
  );

  const didUserLikePost = useMemo(() => {
    const likedUserIdsSet = new Set(likedUserIds);
    return likedUserIdsSet.has(user._id);
  }, [likedUserIds]);

  const addLikeMutation = useMutation(
    async () => {
      if (!postId) throw new Error('Post ID not found');
      return addLike(postId, user._id);
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

  const removeLikeMutation = useMutation(
    async () => {
      if (!postId) throw new Error('Post ID not found');
      return removeLike(postId, user._id);
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

  const deletePostMutation = useMutation(
    async (postId: string) => {
      return deletePost(postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
        toast.success('Successfully deleted your post :)');
      },
      onError: (error) => {
        console.error('Error deleting post:', error);
      },
    }
  );

  const handleCommentsClick = (): void => {
    navigate(`/comments/${postId}`);
  };

  const handleLikesClick = (): void => {
    if (didUserLikePost) {
      removeLikeMutation.mutate();
    } else {
      addLikeMutation.mutate();
      openGeminiModal();
    }
  };

  const onDelete = (): void => {
    if (isProfile) {
      deletePostMutation.mutate(postId);
    }
  };

  const onEdit = (): void => {
    if (isProfile) {
      openEditModal();
    }
  };

  const closeEditModal = (): void => {
    setIsEditModalOpen(false);
  };

  const openEditModal = (): void => {
    setIsEditModalOpen(true);
  };

  const closeGeminiModal = (): void => {
    setIsGeminiModalOpen(false);
  };

  const openGeminiModal = (): void => {
    setIsEditModalOpen(true);
  };

  return (
    <div className="post-container">
      <GeminiReccomendation
        isModalOpen={isGeminiModalOpen}
        onClose={closeGeminiModal}
        bookName={post.title}
      />
      <EditPost
        post={post}
        isModalOpen={isEditModalOpen}
        onClose={closeEditModal}
      />
      <div className="header">
        <div className="post-title">
          {post.title} - {post.owner.name}'s review
        </div>
        {isProfile && (
          <div className="options">
            <FaEdit className="icon" onClick={onEdit} />
            <FaTrashAlt className="icon" onClick={onDelete} />
          </div>
        )}
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
          <div
            className="likes reaction-item clickable"
            onClick={handleLikesClick}
          >
            {didUserLikePost ? (
              <FaHeart className="icon" />
            ) : (
              <CiHeart className="icon" />
            )}
            <div className="item-number">{likedUserIds?.length ?? 0}</div>
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
