import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TicketsComponent } from './components/tickets/tickets.component'
import { LoginComponent } from './components/admin/login/login.component'
import { DashboardComponent } from './components/admin/dashboard/dashboard.component'
import { TicketViewerComponent } from './components/admin/ticket-viewer/ticket-viewer.component'

const routes: Routes = [
  {
    path: 'ticket/submit',
    component: TicketsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'ticket-viewer',
        component: TicketViewerComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
