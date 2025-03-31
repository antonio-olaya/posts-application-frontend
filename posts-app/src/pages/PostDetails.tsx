import { useParams } from 'react-router-dom';
import { usePost } from '../hooks/usePosts';

const PostDetails = () => {
  const { id } = useParams();
  const postId = Number(id);

  // Get the post and comments with postId
  const { postQuery, commentsQuery } = usePost(postId);

  const post = postQuery.data;
  const comments = commentsQuery.data;

  return (
    <div className='max-w-5xl mx-auto px-4'>
      <div className='border mb-2 p-6 rounded-lg'>
        <h1 className='mb-2 font-extrabold'>{post?.title}</h1>
        <p>{post?.body}</p>
      </div>

      <h2 className='text-center mb-2'>COMMENTS</h2>
      {comments?.length === 0 ? (
        <p className='text-center'>No comments available</p>
      ) : (
        comments?.map((comment) => (
          <div key={comment.id} className='border p-2 mb-2 rounded-lg'>
            <h4 className='font-bold'>{comment.name}</h4>
            <p className='text-sm mb-2'>{comment.email}</p>
            <p className='text-sm'>{comment.body}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostDetails;
