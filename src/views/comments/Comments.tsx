import { useState } from 'react';
import './comments.css';
import { IComment } from '../../models/index';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getCommentsByPost, addComment } from '../../services/commentService';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import Spinner from '../../components/spinner/Spinner';

const Comments: React.FC = () => {
  const { postId } = useParams();
  const { userId } = useAppContext();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<IComment[]>(
    ['comments', postId],
    () => getCommentsByPost(postId || 'not found')
  );

  const [commentText, setCommentText] = useState('');

  const addCommentMutation = useMutation(
    async (newComment: string) => {
      if (!postId) throw new Error('Post ID not found');
      return addComment(postId, newComment, userId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', postId]);
        setCommentText('');
      },
      onError: (error) => {
        console.error('Error adding comment:', error);
      },
    }
  );

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      addCommentMutation.mutate(commentText);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommentSubmit();
    }
  };

  if (isLoading) return <Spinner />;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="all-comments-container">
      <div className="comments-title">תגובות על הספר</div>
      <div className="custom-box">
        <div className="comments-container">
          {data?.map((comment: IComment, index: number) => (
            <div key={index} className="comment-container">
              <div className="comment-user">{comment.userId.name}: </div>
              <div className="comment-message">{comment.message}</div>
            </div>
          ))}
        </div>

        <div className="comment-input-container">
          <input
            type="text"
            className="comment-input"
            placeholder="add comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="comment-add-btn" onClick={handleCommentSubmit}>
            add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
