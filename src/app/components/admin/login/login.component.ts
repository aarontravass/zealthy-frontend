import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Apollo, gql } from 'apollo-angular'
import { ApiModel } from '../../../models/ApiModel'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  apiModel = new ApiModel()
  constructor(
    private readonly router: Router,
    private readonly apollo: Apollo
  ) {}

  ngOnInit(): void {}

  body = {
    email: '',
    password: ''
  }

  login() {
    this.apiModel = new ApiModel()
    const createLoginSession = gql`
      mutation createLoginSession($email: String!, $password: String!) {
        createLoginSession(email: $email, password: $password) {
          refreshToken
          authToken
          user {
            id
          }
        }
      }
    `

    this.apollo
      .mutate({
        mutation: createLoginSession,
        variables: this.body
      })
      .subscribe(
        (result: any) => {
          this.apiModel.success = true
          const authToken = result.data.createLoginSession.authToken
          const userId = result.data.createLoginSession.user.id
          sessionStorage.setItem('authToken', authToken)
          sessionStorage.setItem('userId', userId)
        },
        (error) => {
          console.log('there was an error sending the query', error)
        }
      )
    this.apiModel.loading = false
  }
}
