import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { TinyColor } from "@ctrl/tinycolor";
import { CalendarDataService } from "../calendar-data.service";
import { CalendarService } from "../calendar.service";
import { Events } from "../event.model";

@Component({
    selector: 'app-change-event',
    templateUrl: './change-event.component.html',
    styleUrls: ['./change-event.component.css']
})
export class ChangeEventComponent implements OnInit {
    events: Events[] = [];

    constructor(
        public dialogRef: MatDialogRef<ChangeEventComponent>,
        private calendarService: CalendarService,
        private calendarDataService: CalendarDataService
    ) {}



    ngOnInit(): void {
        this.events = this.calendarService.getAllEvents();
    }

    close() {
        this.dialogRef.close();
    }



    changeDate(newDate: any, index: number) {
        this.calendarService.changeDate(newDate.value, index);
        this.calendarDataService.saveEvents();
        this.calendarDataService.fetchEvents();
    }
    
    getColorContrast(background): String {
        if (new TinyColor(background).getLuminance() > 0.179) {
          return '#000';
        } else {
          return '#fff';
        }
    }
}