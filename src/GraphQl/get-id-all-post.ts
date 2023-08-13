import { gql } from '@apollo/client';
import { IdPosts, PostMobileDetail } from '../models/posts.model'

export interface I_ID_GET_POSTS {
  getAllPosts: {
    totalCount: number;
    edges: [{ node: IdPosts }];
  };
}

export interface I_GET_ALL_POSTS {
  getAllPosts: {
    totalCount: number;
    edges: [{ node: PostMobileDetail }];
  };
}

export const GET_ID_POSTS = gql`
  query getAllPosts($offset: Int) {
    getAllPosts(offset: $offset) {    
      edges {
        node {
          id
        }
      }
    }
  }
`;

export const GET_All_POSTS = gql`
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
