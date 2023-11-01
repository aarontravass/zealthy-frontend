import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Apollo, gql } from 'apollo-angular'
import { Ticket } from '../../../models/Ticket'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.findAllTickets()
  }
  pageNo = 1
  recordsPerPage = 5

  constructor(
    private readonly router: Router,
    private readonly apollo: Apollo
  ) {}

  tickets: Ticket[] = []

  findAllTickets() {
    const fetchAllTickets = gql`
      query fetchAllTickets($pageNo: Int!, $recordsPerPage: Int!) {
        fetchAllTickets(pageNo: $pageNo, recordsPerPage: $recordsPerPage) {
          authorName
          content
          createdAt
          id
          status
          ticketNumber
          email
        }
      }
    `
    this.apollo
      .query({
        query: fetchAllTickets,
        variables: {
          pageNo: this.pageNo,
          recordsPerPage: this.recordsPerPage
        }
      })
      .subscribe(
        (result: any) => {
          this.tickets = result.data.fetchAllTickets
          console.log(result)
        },
        (error) => {
          console.error(error)
        }
      )
  }

  openTicket(ticketId?: string) {
    this.router.navigate(['dashboard/ticket-viewer'], { queryParams: { ticketId } })
  }
}
