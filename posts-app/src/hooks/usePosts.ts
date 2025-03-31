import { useQuery } from '@tanstack/react-query';
import {
  fetchCommentsByPostId,
  fetchPostById,
  fetchPosts,
} from '../services/postsServices';

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

export const usePost = (postId: number) => {
  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
  });

  const commentsQuery = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchCommentsByPostId(postId),
  });

  return {
    postQuery,
    commentsQuery,
  };
};
