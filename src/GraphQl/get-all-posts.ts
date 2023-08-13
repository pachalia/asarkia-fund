import { gql } from '@apollo/client';
import { Post } from '../models/posts.model';

export interface I_GET_ALL_POSTS {
  getAllPosts: {
    totalCount: number;
    edges: [{ node: Post }];
  };
}

export const GET_ALL_POSTS = gql`
  query getAllPosts($first: Int, $offset: Int) {
    getAllPosts(first: $first, offset: $offset) {
      totalCount
      edges {
        node {
          id
          title          
          created_at
          post_type
        }
      }
    }
  }
`;