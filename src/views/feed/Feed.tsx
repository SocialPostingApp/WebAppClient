import Post from "../../components/post/post";
import { IPost } from "../../models/index";
import { useQuery } from "react-query";
import { getAllPosts } from "../../services/postService";
import './style.css';

const Feed: React.FC = () => {
  const { data, isLoading, error } = useQuery<IPost[]>(['posts'], () => getAllPosts());


  if (isLoading) 
    return <p>Loading posts</p>;
  if (error instanceof Error) 
    return <p>Error: {error.message}</p>;

  return (
    <div className="feed-container">
      {data?.map((post: IPost, index: number) => (
        <Post key={index} post={post} />
    ))}
    </div>
  );
}

export default Feed;
