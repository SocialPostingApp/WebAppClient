import { useState, useEffect } from 'react';
import Post from '../../components/post/post';
import { IPost } from '../../models/index';
import { getAllPosts } from '../../services/postService';
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.css';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMorePosts = async () => {
    try {
      const postPagesResponse = await getAllPosts(page);
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
            <Post key={index} post={post} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Feed;
