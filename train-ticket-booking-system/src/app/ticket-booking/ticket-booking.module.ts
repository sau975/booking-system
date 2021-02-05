import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookTicketComponent } from './component/book-ticket/book-ticket.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'book-ticket',
    component: BookTicketComponent
  },
  {
    path: '', redirectTo: 'book-ticket', pathMatch: 'full'
  }
];


@NgModule({
  declarations: [BookTicketComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TicketBookingModule { }
