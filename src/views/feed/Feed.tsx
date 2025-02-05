import Post from '../../components/post/post';
import { IPost } from '../../models/index';
import { IPostResponse } from '../../services/postService';
import InfiniteScroll from 'react-infinite-scroll-component';
import BottomNavbar from '../../components/bottomNavbar/BottomNavbar';
import { useAppContext } from '../../context/appContext';
import { useInfiniteQuery } from 'react-query';
import Spinner from '../../components/spinner/Spinner';
import './style.css';

interface IProps {
  isProfile?: boolean;
  children?: React.ReactNode;
  getPosts: (page: number, userId: string) => Promise<IPostResponse>;
}

const Feed: React.FC<IProps> = ({ isProfile = false, getPosts, children }) => {
  const { user } = useAppContext();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    isProfile ? ['posts', user._id] : ['posts'],
    ({ pageParam = 1 }) => getPosts(pageParam, user._id),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length + 1 : undefined,
    }
  );

  if (isLoading) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  const posts: IPost[] = data?.pages.flatMap((page) => page.posts) || [];
  return (
    <div className="feed-page">
      {children ?? <></>}
      <div id="scrollableFeed" className="feed-container">
        <div className="infinite-scroll-container">
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<Spinner />}
            scrollableTarget="scrollableFeed"
            className="infinite-scroll-wrapper"
          >
            {posts.map((post, index) => (
              <Post isProfile={isProfile} key={index} post={post} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Feed;
