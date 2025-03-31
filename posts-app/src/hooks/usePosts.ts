import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../services/postsServices';

/**
 *
 * @param page
 * @param limit
 * @returns useQuery hook for fetching posts
 */
export const usePosts = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['posts', page, limit],
    queryFn: () => fetchPosts(page, limit),
  });
};
