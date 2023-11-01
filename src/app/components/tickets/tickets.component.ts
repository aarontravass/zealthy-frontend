import { Component, OnDestroy, OnInit } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  body = {
    authorName: '',
    email: '',
    content: ''
  }
  ticketNumber: number | null = null
  success = false
  constructor(
    private readonly apollo: Apollo,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
   
  }

  submitTicket() {
    this.success = false
    const createTicket = gql`
      mutation createTicket($email: String!, $content: String!, $authorName: String!) {
        createTicket(email: $email, content: $content, authorName: $authorName) {
          id
          ticketNumber
        }
      }
    `
    this.apollo
      .mutate({
        mutation: createTicket,
        variables: this.body
      })
      .subscribe(
        (result: any) => {
          console.log(result.data)
          this.success = true
          this.ticketNumber = result.data.createTicket.ticketNumber
          this.openSnackBar('Your ticket has been successfully submitted.')
        },
        (error) => {
          console.log('there was an error sending the query', error)
        }
      )
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK')
  }
}
