import { Post } from '../components/types';
import { Comment } from '../components/types';

const API_URL = 'https://jsonplaceholder.typicode.com';

/**
 *
 * @param page
 * @param limit
 * @returns Promise<{ data: Post[]; total: number }>
 * Fetch posts from the API by page and limit parameters
 */
export const fetchPosts = async (page: number, limit: number) => {
  const response = await fetch(
    `${API_URL}/posts/?_page=${page}&_limit=${limit}`
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  const data: Post[] = await response.json();
  // x-total count contains the total number of posts
  const total = parseInt(response.headers.get('x-total-count') || '0', 10);

  return {
    data,
    total,
  };
};

/**
 *
 * @param id
 * @returns Promise<Post>
 * Fetch a single post by ID
 */
export const fetchPostById = async (id: number) => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  const data: Post = await response.json();
  return data;
};

/**
 *
 * @param id
 * @returns Promise<Comment[]>
 * Fetch comments for a post by post ID
 */
export const fetchCommentsByPostId = async (id: number) => {
  const response = await fetch(`${API_URL}/posts/${id}/comments`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  const data: Comment[] = await response.json();
  return data;
};

/**
 *
 * @param post
 * @returns Promise<Post>
 * Mocks the creation of a new post. Handling of the post creation is done in the frontend using React Query
 */
export const createNewPost = async (post: { title: string; body: string }) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  const data: Post = await response.json();
  return data;
};
