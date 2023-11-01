import { Comment } from './Comment'

export interface Ticket {
  authorName?: string
  content?: string
  createdAt?: Date
  email?: string
  id?: string
  status?: string
  ticketNumber?: number
  updatedAt?: Date
  comments?: Comment[]
  isOpen?: boolean
}
