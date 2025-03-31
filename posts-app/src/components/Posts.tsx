import { useState } from 'react';
import Pagination from './Pagination';
import { POSTS_PER_PAGE } from '../const';
import { usePosts } from '../hooks/usePosts';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts = () => {
  const [page, setPage] = useState(1);

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
      <h1 className='text-center mb-4 font-bold'>POSTS</h1>
      {data?.data.map((post: Post) => (
        <div key={post.id} className='border p-4 mb-4 rounded shadow'>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
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
