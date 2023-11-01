import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '../../material.module'
import { TicketViewerComponent } from './ticket-viewer/ticket-viewer.component'

@NgModule({
  declarations: [LoginComponent, DashboardComponent, TicketViewerComponent],
  imports: [MaterialModule, FormsModule, CommonModule]
})
export class AdminModule {}
