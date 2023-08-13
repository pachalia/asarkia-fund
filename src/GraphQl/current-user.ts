import { gql } from '@apollo/client';
import { ICurrentUser } from '../models/auth.model'

export interface I_CURRENT_USER {
  currentUser:ICurrentUser
}

export const CURRENT_USER = gql`
  query currentUser($token: String) {
    currentUser(token: $token) {
      id
      login
      role
      expIn
    }
  }
`