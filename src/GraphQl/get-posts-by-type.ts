import { gql } from '@apollo/client';
import { Post } from '../models/posts.model';

export interface I_GET_POST_BY_TYPE {
  getPostByType: {
    totalCount: number;
    edges: [{ node: Post }];
  };
}

export const GET_POSTS_BY_TYPE = gql`
  query getPostByType($id: PostTypeIdInput!, $first: Int, $offset: Int) {
    getPostByType(postTypeId: $id, first: $first, offset: $offset) {
      totalCount
      edges {
        node {
          id
          title
          pre_post
          small_image
          created_at
          post_type
        }
      }
    }
  }
`;

export const GET_POSTS_BY_TYPE_ADMIN = gql`
  query getPostByType($id: PostTypeIdInput!, $first: Int, $offset: Int) {
    getPostByType(postTypeId: $id, first: $first, offset: $offset) {
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
