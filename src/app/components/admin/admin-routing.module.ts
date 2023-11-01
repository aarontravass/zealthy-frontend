import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { TicketViewerComponent } from './ticket-viewer/ticket-viewer.component'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'ticket-viewer',
    component: TicketViewerComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
