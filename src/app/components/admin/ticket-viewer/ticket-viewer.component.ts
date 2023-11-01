import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Apollo, gql } from 'apollo-angular'
import { Ticket } from '../../../models/Ticket'
import { Comment } from '../../../models/Comment'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-ticket-viewer',
  templateUrl: './ticket-viewer.component.html',
  styleUrls: ['./ticket-viewer.component.css']
})
export class TicketViewerComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly apollo: Apollo,
    private readonly route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ticketId: string | undefined
  ticket: Ticket = {}

  ticketStatus = ['NEW', 'INPROGRESS', 'RESOLVED']

  newComment: Comment = {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.ticketId = queryParams['ticketId']
      this.fetchOneTicket()
    })
  }

  fetchOneTicket() {
    const fetchTicket = gql`
      query fetchTicket($ticketId: ID!) {
        fetchTicket(ticketId: $ticketId) {
          authorName
          content
          createdAt
          email
          id
          status
          ticketNumber
          comments {
            author {
              firstName
              lastName
              email
            }
            comment
            createdAt
            id
          }
        }
      }
    `
    this.apollo
      .query({
        query: fetchTicket,
        variables: {
          ticketId: this.ticketId
        }
      })
      .subscribe(
        (result: any) => {
          this.ticket.comments = []
          Object.entries(result.data.fetchTicket).forEach(([key, value]) => {
            Object.assign(this.ticket, { [key]: value })
          })
          this.ticket.comments = []
          for (const comment of result.data.fetchTicket.comments) this.ticket.comments.push(comment)
          console.log(this.ticket)
        },
        (error) => {
          console.error(error)
        }
      )
  }

  submitComment() {
    const addComment = gql`
      mutation addComment($comment: String!, $ticketId: ID!) {
        addComment(comment: $comment, ticketId: $ticketId) {
          author {
            firstName
            lastName
            email
          }
          comment
          createdAt
          id
        }
      }
    `
    this.apollo
      .mutate({
        mutation: addComment,
        variables: {
          comment: this.newComment.comment,
          ticketId: this.ticketId
        }
      })
      .subscribe(
        (result: any) => {
          this.ticket.comments?.push(result.data.addComment)
          console.log(result)
          this.newComment = {}
          this.openSnackBar('Your comment has been submitted successfully and an email has been sent!')
        },
        (error) => {
          console.error(error)
        }
      )
  }

  updateStatus() {
    const updateTicket = gql`
      mutation updateTicket($status: String!, $ticketId: ID!) {
        updateTicket(status: $status, ticketId: $ticketId) {
          id
        }
      }
    `
    this.apollo
      .mutate({
        mutation: updateTicket,
        variables: {
          ticketId: this.ticketId,
          status: this.ticket.status
        }
      })
      .subscribe(
        (result) => {
          this.openSnackBar('status has been updated')
        },
        (error) => {
          console.error(error)
        }
      )
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', { duration: 3000 })
  }
}
