import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TicketsComponent } from './components/tickets/tickets.component'

const routes: Routes = [
  {
    path: 'ticket/submit',
    component: TicketsComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
