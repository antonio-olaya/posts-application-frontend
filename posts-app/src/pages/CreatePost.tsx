import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewPost } from '../services/postsServices';
import { Post } from '../components/types';

const CreatePost = () => {
  const queryClient = useQueryClient();

  // useMutatation to create a new post
  const createPostMutation = useMutation({
    mutationFn: createNewPost,
    onSuccess: (newPost) => {
      try {
        // API is not persistant, so we update the cache manually
        queryClient.setQueryData(
          ['posts', 1, 10],
          (oldData: { data: Post[]; total: number } | undefined) => {
            // Handle the case when oldData is undefined
            if (!oldData) {
              return {
                data: [newPost],
                total: 1,
              };
            }
            // Append new post to the existing posts
            return {
              ...oldData,
              data: [newPost, ...oldData.data],
              total: oldData.total + 1,
            };
          }
        );
      } catch (error) {
        console.error('Error updating cache:', error);
      }
    },
  });

  const { isSuccess, isError } = createPostMutation;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Get form data
    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;
    const post = { title, body, userId: Math.floor(Math.random() * 1000) };

    // Call the mutation to create a new post
    createPostMutation.mutate(post);
  };

  if (isError) {
    return <p className='text-red-500'>Error creating post</p>;
  }

  if (isSuccess) {
    return (
      <Link to='/'>
        <p className='text-green-500'>
          Post created successfully! Click here to go back to the homepage.
        </p>
      </Link>
    );
  }
  return (
    <div>
      <h1 className='text-center text-2xl'>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col mb-4 px-4'>
          <label htmlFor='title' className='mb-2 font-medium'>
            Title:
          </label>
          <input
            type='text'
            id='title'
            name='title'
            className='border rounded p-2 mb-4 bg-white text-black'
            required
          />
          <label htmlFor='body'>Body:</label>
          <textarea
            id='body'
            name='body'
            className='border rounded p-2 mb-4 bg-white text-black'
            required
          ></textarea>
          <button type='submit'>Create Post</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
