export interface User {
  id: number
  login: string
  email: string
  token:string
}

export interface ICurrentUser {
  id: number
  login: string
  role: string
  expIn: string
}