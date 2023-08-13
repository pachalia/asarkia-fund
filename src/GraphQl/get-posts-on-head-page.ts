import { gql } from '@apollo/client';
import { Post } from '../models/posts.model';

export interface I_GET_POSTS_ON_HEAD_PAGE {
  getPostsOnHeadPage: Post;
}

export const GET_POSTS_ON_HEAD_PAGE = gql`
  query {
    getPostsOnHeadPage {
      id
      title
      pre_post
      small_image
      created_at
      post_type
    }
  }
`;
