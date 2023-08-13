import { gql } from '@apollo/client';
import { PostForMobile } from '../models/posts.model';

export interface I_GET_MOBILE_POST_BY_TYPE {
  getPostByType: {
    totalCount: number;
    edges: [{ node: PostForMobile }];
  };
}

export const GET_MOBILE_POSTS_BY_TYPE = gql`
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
