import { useState } from 'react';
import Pagination from './Pagination';
import { POSTS_PER_PAGE } from '../const';
import { usePosts } from '../hooks/usePosts';
import { Link } from 'react-router-dom';

const Posts = () => {
  const [page, setPage] = useState(1);

  // Fetch posts with pagination
  const { data, isLoading, isError } = usePosts(page, POSTS_PER_PAGE);

  if (isLoading) {
    return <p className='text-center'>Loading...</p>;
  }
  if (isError) {
    return <p className='text-center'>Error loading posts</p>;
  }
  if (!data) {
    return <p className='text-center'>No data available</p>;
  }

  return (
    <div className='max-w-5xl mx-auto px-4'>
      <h1 className='text-center text-3xl mb-4 font-bold'>POSTS</h1>
      <div className='mb-4 flex justify-center'>
        <Link to='/create'>
          <button className='text-center px-4 py-2 rounded'>Create Post</button>
        </Link>
      </div>
      {data?.data.map((post) => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <div key={post.id} className='border p-4 mb-4 rounded shadow'>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        </Link>
      ))}
      <Pagination
        currentPage={page}
        totalPosts={data?.total || 0}
        postsPerPage={POSTS_PER_PAGE}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Posts;
