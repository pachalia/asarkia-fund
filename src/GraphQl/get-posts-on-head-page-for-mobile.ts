import { gql } from '@apollo/client';
import { PostForMobile } from '../models/posts.model';

export interface I_GET_POSTS_ON_HEAD_PAGE_FOR_MOBILE {
  getPostsOnHeadPage: PostForMobile;
}

export const GET_POSTS_ON_HEAD_PAGE_FOR_MOBILE = gql`
  query {
    getPostsOnHeadPage {
      id
      title
      created_at
      post_type
    }
  }
`;
