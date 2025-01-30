import { IComment } from "../../models/index";
import { useQuery } from "react-query";
import { getCommentsByPost } from "../../services/commentService";
import "./comments.css";
import { useParams } from "react-router-dom";

const Comments: React.FC = () => {
  const { postId } = useParams();
  const { data, isLoading, error } = useQuery<IComment[]>(
    ["comments", postId],
    () => getCommentsByPost(postId || "not found")
  );

  if (isLoading) return <p>Loading comments</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="all-comments-container">
      <div className="comments-title">תגובות על הספר</div>
      <div className="custom-box">
        {data?.map((comment: IComment, index: number) => (
          <div key={index} className="comment-container">
            <div className="comment-user">{comment.userId}: </div>
            <div className="comment-message">{comment.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
