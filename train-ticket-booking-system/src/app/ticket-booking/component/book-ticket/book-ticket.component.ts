import { IBookTicket } from './../../interface/book-ticket';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mockResponse, SeatInfo } from '../../interface/book-ticket';
import { BookTicketService } from '../../service/book-ticket.service';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {

  public bookingInfo: IBookTicket;
  public bookingForm: FormGroup;
  public availablseats: SeatInfo[];
  public flag: boolean = true;
  public error: string;
  public res: any;

  constructor(
    private fb: FormBuilder,
    private bookTicketService: BookTicketService
    ) {
    this.initateForm();
  }

  public ngOnInit(): void {
    this.bookingInfo = mockResponse;
    this.availablseats = this.getAvailablseats();
    this.bookTicketService.get().subscribe(data => {
      this.res = data;
    });
  }

  public onSubmit(formValues: FormGroup): void {
    const userName: string = formValues.controls.name.value;
    const requiredSeats: number = parseInt(formValues.controls['count'].value);
    if (requiredSeats > this.availablseats.length) {
      this.error = "required seats not available";
    }
    else if (requiredSeats > 7){
      this.error = "you can not book more than 7 seats";
    }
    else if (requiredSeats > 0) {
      this.checkInCategorys(userName, requiredSeats);
    }
  }

  public openBookingForm(): void {
    this.bookingForm.setValue({
      name: '',
      count: ''
    });
    this.flag = false;
    this.error = '';
  }

  private getAvailablseats(): SeatInfo[] {
    let availablseats: SeatInfo[] = []
    this.bookingInfo.seats.forEach(seat => {
      if (seat.status === 'available') {
        availablseats.push(seat);
      }
    });
    return availablseats;
  }

  private checkInCategorys(name: string, count: number): void {
    let category2: SeatInfo[] = [];
    let category3: SeatInfo[] = [];
    if (count === 1) {
      category2 = this.checkInCategory(count, 2);
      if (category2.length !== 0) {
        this.bookSeat(category2, name);
      } else {
        category3 = this.checkInCategory(count, 3);
        if (category3.length !== 0) {
          this.bookSeat(category3, name);
        }
      }
    } else if (count === 2) {
      category2 = this.checkInCategory(count, 2);
      if (category2.length !== 0) {
        this.bookSeat(category2, name);
      } else {
        category3 = this.checkInCategory(count, 3);
        if (category3.length !== 0) {
          this.bookSeat(category3, name);
        } else {
          this.bookSeat(this.getRandomSeats(count), name);
        }
      }
    } else if(count === 3){
      category3 = this.checkInCategory(count, 3);
        if (category3.length !== 0) {
          this.bookSeat(category3, name);
        } else {
          this.bookSeat(this.getRandomSeats(count), name);
        }
    } else {
        this.bookSeat(this.getRandomSeats(count), name);
    }
  }

  private bookSeat(bookseats: SeatInfo[], name: string): void {
    bookseats.forEach(seat => {
      const index: number = this.bookingInfo.seats.findIndex(data => data.seatNo === seat.seatNo);
      this.bookingInfo.seats[index].status = "booked";
      this.bookingInfo.seats[index].bookedBy = name;
    });

    this.availablseats = this.getAvailablseats();

    this.flag = true;
  }

  private checkInCategory(count: number, category: number): SeatInfo[] {
    let bookseats: SeatInfo[] = [];
    this.availablseats.forEach(seat => {
      if (bookseats.length < count) {
        if (seat.category === category) {
          bookseats.push(seat);
        }
        if (bookseats.length === count && count > 1) {
          bookseats = this.chekIfSameRow(bookseats);
        }
      }

    });
    if (bookseats.length === count) {
      return bookseats;
    } else {
      return [];
    }
  }

  private chekIfSameRow(bookseats: SeatInfo[]): SeatInfo[] {
    let row: number[] = [];
    bookseats.forEach(seat => {
      row.push(seat.row);
    })
    if (Array.from(new Set(row)).length === 1) {
      return bookseats;
    } else {
      const removeIndex = bookseats.splice(-1, 1);

      return removeIndex;
    }
  }

  private getRandomSeats(count: number): SeatInfo[] {
    let randomSeats: SeatInfo[] = [];
    this.availablseats.forEach(seat => {
      if (randomSeats.length < count) {
        randomSeats.push(seat)
      }
    });
    return randomSeats;
  }

  private initateForm(): void {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      count: ['', Validators.required]
    });
  }

}
