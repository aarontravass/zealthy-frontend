import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = sessionStorage.getItem('authToken') // you probably want to store it in localStorage or something
    const headers = req.headers
    const req_1 = req.clone({
      headers,
      withCredentials: true
    })

    if (!token) {
      return next.handle(req_1)
    }

    const req1 = req.clone({
      headers: headers.set('Authorization', `Bearer ${token}`),
      withCredentials: true
    })

    return next.handle(req1)
  }
}
