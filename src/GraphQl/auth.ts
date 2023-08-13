import { gql } from '@apollo/client';
import { User } from '../models/auth.model'

export interface I_AUTH {
  auth: User
}

export const AUTH = gql`
  query auth($auth: AuthInput!) {
    auth(auth: $auth) {
      id
      login
      token
      email
    }
  }
`