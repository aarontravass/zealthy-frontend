import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TicketsComponent } from './components/tickets/tickets.component'
import { LoginComponent } from './components/login/login.component'

const routes: Routes = [
  {
    path: '',
    component: TicketsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/admin/admin.module').then((module) => module.AdminModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
