/*
  =========
   IMPORTS
  =========
*/

/*
  Libraries
*/
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

/* 
  Services, components and model
*/
import { AuthService } from '../auth/auth.service';
import { CalendarService } from './calendar.service';
import { CalendarDataService } from './calendar-data.service';
import { AddEventComponent } from './add-event/add-event.component';
import { ChangeEventComponent } from './change-event/change-event.component';
import { DeleteEventComponent } from './delete-event/delete-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { Events } from './event.model';
import { ColorContrastService } from '../shared/color-contrast.service';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit, OnDestroy {
  /* 
    ===========
     VARIABLES
    ===========
  */

  /*
    Arrays for the Calendar
  */
  months: String[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  weekdays: String[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  /*
    Date variables
  */
  date = new Date()
  dateHTML = this.date.toDateString();
  currentDay = this.date.getDate();
  currentMonth = this.date.getMonth();
  currentYear = this.date.getFullYear();
  month = this.date.getMonth();
  year = this.date.getFullYear();

  /*
    Variables for the prev and next month days
  */
  newDate = new Date(this.year, this.month, 1);
  firstDayIndex = this.newDate.getDay();
  lastDay = new Date(this.year, this.month + 1, 0).getDate();
  lastDayIndex = new Date(this.year, this.month + 1, 0).getDay();
  prevLastDay = new Date(this.year, this.month, 0).getDate();
  prevDays: number[];

  /*
    Events declaration
  */
  events: Events[];  

  /*
    Variables for the creation of Components 
  */
  eventShortDate: String = '';
  eventOpenDetailsId: number;
  
  /*
    Verification variable
  */
  isAuthenticated = false;

  /*
    Subscriptions
  */
  private authSubscription: Subscription;
  private eventSubscription: Subscription;

  /*
    Constructor
  */
  constructor(
    private matDialog: MatDialog,
    private authService: AuthService,
    private calendarService: CalendarService,
    private calendarDataService: CalendarDataService,
    private colorContrastService: ColorContrastService
  ) { }


  
  /* 
    =================
     LIFECYCLE HOOKS
    =================
  */

  /* 
    Inicialize events and subscriptions
  */
  ngOnInit(): void {
    this.events = this.calendarService.getAllEvents();
    this.eventSubscription = this.calendarService.eventsChanged.subscribe(
      (events: Events[]) => {
        this.events = events;
      }
    );
    this.calendarDataService.fetchEvents().subscribe();
      
    this.authSubscription = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );
  }

  /*
    Unsubscription
  */
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.eventSubscription.unsubscribe();
  }



  /* 
    ===============
     DAYS COUNTERS
    ===============
  */
  prevDaysCounter() {
    let dayIndex = this.firstDayIndex === 0 ? 6 : this.firstDayIndex - 1;
    const prevDaysArray = new Array(dayIndex);
    let prevDays = this.prevLastDay - dayIndex + 1;

    for(let i = 0; i < prevDaysArray.length; i++) {
      prevDaysArray[i] = prevDays;
      prevDays++;
    }

    return prevDaysArray;
  }
  
  daysCounter() {
    return new Array(this.lastDay);
  }

  nextDaysCounter() {
    let nextDays = 7 - (this.lastDayIndex === 0 ? 7 : this.lastDayIndex);
    const nextDaysArray = new Array(nextDays);

    for (let i = 0; i < nextDaysArray.length; i++) {
      nextDaysArray[i] = i + 1;
    }

    return nextDaysArray;
  }



  /*
    ===============
     CHANGE MONTHS
    ===============
  */

  nextMonth() {
    this.month++;
    this.updateDays();
    
    if (this.month > 11) {
      this.month = 0;
      this.year++;
      this.updateDays();
    }
  }

  prevMonth() {
    this.month--;
    this.updateDays();

    if (this.month < 0) {
      this.month = 11;
      this.year--;
      this.updateDays();
    }
  }

  /* 
    Update Days When Month Or Year Change
  */
  updateDays() {
    this.newDate = new Date(this.year, this.month, 1);
    this.lastDay = new Date(this.date.getFullYear(), this.month + 1, 0).getDate();
    this.prevLastDay = new Date(this.date.getFullYear(), this.month, 0).getDate();
    this.lastDayIndex = new Date(this.year, this.month + 1, 0).getDay();
    this.firstDayIndex = this.newDate.getDay();

    this.daysCounter();
    this.prevDaysCounter();
    this.nextDaysCounter();
  }



  /*
    ====================
     COMPONENTS CREATOR
    ====================
  */
  addCalendarComponent(type: String) {
    /*
      Default configuration
    */
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.height = "600px";
    dialogConfig.width = "400px";


    /*
      Modify and open based on the type
    */
    switch (type) {
      /*
        Add Event
      */
      case 'add-event':
        dialogConfig.id = "add-event-component";
        const eventAddDialog = this.matDialog.open(AddEventComponent, dialogConfig);
        eventAddDialog.componentInstance.datePlaceholder = this.eventShortDate;
        break;
    
      /*
        Delete Event
      */
      case 'delete-event':
        dialogConfig.id = "delete-event-component";
        this.matDialog.open(DeleteEventComponent, dialogConfig);
        break;

      /*
        Change Event
      */
      case 'change-event':
        dialogConfig.id = "change-event-component";
        this.matDialog.open(ChangeEventComponent, dialogConfig);
        break;

      /*
        Open Details
      */
      case 'open-details':
        dialogConfig.disableClose = false;
        dialogConfig.id = "event-details-component";
        dialogConfig.height = "175px";
        dialogConfig.width = "350px";

        const eventDetailsDialog = this.matDialog.open(EventDetailsComponent, dialogConfig);
        eventDetailsDialog.componentInstance.eventId = this.eventOpenDetailsId;
        eventDetailsDialog.componentInstance.textColor = this.colorContrastService.getColorContrast(this.events[this.eventOpenDetailsId].color);
        break;
    }
  }
  
  /*
    Functions to add more params to the components
  */
  addEventShort(date: String) {
    this.eventShortDate = date;
    this.addCalendarComponent('add-event');
  }

  openDetails(index: number) {
    this.eventOpenDetailsId = index;
    this.addCalendarComponent('open-details');
  }
}
