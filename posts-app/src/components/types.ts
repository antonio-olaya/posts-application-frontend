export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
  onPageChange: (page: number) => void;
}
