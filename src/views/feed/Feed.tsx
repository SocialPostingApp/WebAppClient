import { useState, useEffect } from 'react';
import Post from '../../components/post/post';
import { IPost } from '../../models/index';
import { IPostResponse } from '../../services/postService';
import InfiniteScroll from 'react-infinite-scroll-component';
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar';
import './style.css';
import { useAppContext } from '../../context/appContext';

interface IProps {
  isProfile?: boolean;
  getPosts: (page: number, userId: string) => Promise<IPostResponse>;
}

const Feed: React.FC<IProps> = ({ isProfile = false, getPosts }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { userId } = useAppContext();

  const fetchMorePosts = async () => {
    try {
      const postPagesResponse = await getPosts(page, userId);
      const newPosts = postPagesResponse.posts;
      setHasMore(postPagesResponse.hasMore);

      if (newPosts.length) {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
  };

  useEffect(() => {
    fetchMorePosts();
  }, []);

  return (
    <div id="scrollableFeed" className="feed-container">
      <div className="infinite-scroll-container">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={<p className="loading-text">Loading more posts...</p>}
          scrollableTarget="scrollableFeed"
          className="infinite-scroll-wrapper"
        >
          {posts.map((post, index) => (
            <Post isProfile={isProfile} key={index} post={post} />
          ))}
        </InfiniteScroll>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Feed;
