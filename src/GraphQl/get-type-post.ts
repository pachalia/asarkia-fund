import { gql } from '@apollo/client';
import { ITypePost } from '../models/posts.model'

export interface IGET_TYPE_POST {
  getTypePost: ITypePost[]
}

export const GET_TYPE_POST = gql`
  query getTypePost {
    getTypePost {
      id
      value
    }
  }
`