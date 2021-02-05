import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'ticket-booking',
    loadChildren: () => import('./ticket-booking/ticket-booking.module').then( m => m.TicketBookingModule)
  },
  {
    path: '', redirectTo: 'ticket-booking', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
