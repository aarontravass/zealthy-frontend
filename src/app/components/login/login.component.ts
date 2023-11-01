import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Apollo, gql } from 'apollo-angular'
import { ApiModel } from '../../models/ApiModel'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  apiModel = new ApiModel()
  constructor(
    private readonly router: Router,
    private readonly apollo: Apollo,
    private _snackBar: MatSnackBar
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
          this.router.navigate(['/dashboard'])
        },
        (error) => {
          console.log('there was an error sending the query', error)
          this.openSnackBar(error.message)
        }
      )
    this.apiModel.loading = false
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', { duration: 3000 })
  }
}
