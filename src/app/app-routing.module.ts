import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TicketsComponent } from './components/tickets/tickets.component'
import { LoginComponent } from './components/login/login.component'
import { NotfoundComponent } from './components/notfound/notfound.component'

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
  },
  {
    path: '**',
    component: NotfoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
