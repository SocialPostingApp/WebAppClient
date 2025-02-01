import Post from '../../components/post/post';
import { IPost } from '../../models/index';
import { IPostResponse } from '../../services/postService';
import InfiniteScroll from 'react-infinite-scroll-component';
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar';
import { useAppContext } from '../../context/appContext';
import { useInfiniteQuery } from 'react-query';
import './style.css';

interface IProps {
  isProfile?: boolean;
  getPosts: (page: number, userId: string) => Promise<IPostResponse>;
}

const Feed: React.FC<IProps> = ({ isProfile = false, getPosts }) => {
  const { userId } = useAppContext();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    isProfile ? ['posts', userId] : ['posts'],
    ({ pageParam = 1 }) => getPosts(pageParam, userId),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length + 1 : undefined,
    }
  );

  const posts: IPost[] = data?.pages.flatMap((page) => page.posts) || [];

  return (
    <div id="scrollableFeed" className="feed-container">
      <div className="infinite-scroll-container">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
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
