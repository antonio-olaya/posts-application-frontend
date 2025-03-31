import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchCommentsByPostId,
  fetchPostById,
  fetchPosts,
} from '../services/postsServices';
import { Post } from '../components/types';

/**
 *
 * @param page
 * @param limit
 * @returns useQuery hook for fetching posts with pagination. Will also merge new posts existing on the cache
 */
export const usePosts = (page: number, limit: number) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['posts', page, limit],
    queryFn: async () => {
      const apiPosts = await fetchPosts(page, limit);
      // Get the new posts from the cache
      const newPosts = queryClient.getQueryData<{
        data: Post[];
        total: number;
      }>(['posts', page, limit]);
      const allPosts = newPosts
        ? {
            ...apiPosts,
            data: [...newPosts.data, ...apiPosts.data],
          }
        : apiPosts;

      return allPosts;
    },
  });
};

/**
 *
 * @param postId
 * @returns useQuery hook for fetching a single post and its comments
 */
export const usePost = (postId: number) => {
  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
  });

  /**
   * @param postId
   * @returns useQuery hook for fetching comments for a post
   */
  const commentsQuery = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchCommentsByPostId(postId),
  });

  return {
    postQuery,
    commentsQuery,
  };
};
