import { User } from './User'

export interface Comment {
  author?: User
  comment?: string
  id?: string
  createdAt?: Date
  updatedAt?: Date
}
