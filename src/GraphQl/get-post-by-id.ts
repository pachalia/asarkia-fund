import { gql } from '@apollo/client';
import { PostDetail, PostMobileDetail } from '../models/posts.model'

export interface I_GET_POST_BY_ID {
  getPostById: PostDetail;
}

export interface I_GET_POST_BY_ID_MOBILE {
  getPostById: PostMobileDetail;
}

export const GET_POST_BY_ID = gql`
  query getPostById($id: Float!) {
    getPostById(id: $id) {
      id
      title
      post
      image
    }
  }
`;

export const GET_POST_BY_ID_MOBILE = gql`
  query getPostById($id: Float!) {
    getPostById(id: $id) {
      id
      title
      post_for_mobile      
    }
  }
`;
