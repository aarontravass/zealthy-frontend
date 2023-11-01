import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { GraphQLModule } from './graphql.module'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TicketsComponent } from './components/tickets/tickets.component'
import { AdminModule } from './components/admin/admin.module'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from './material.module'
import { AuthInterceptorService } from './services/auth-interceptor.service'
import { LoginComponent } from './components/login/login.component'

@NgModule({
  declarations: [AppComponent, TicketsComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AdminModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
