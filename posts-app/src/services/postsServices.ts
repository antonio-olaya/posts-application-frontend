import { Post } from '../components/Posts';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

/**
 *
 * @param page
 * @param limit
 * @returns Promise<{ data: Post[]; total: number }>
 */
export const fetchPosts = async (page: number, limit: number) => {
  const response = await fetch(`${API_URL}?_page=${page}&_limit=${limit}`);
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
