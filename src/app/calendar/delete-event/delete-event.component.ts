import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { TinyColor } from "@ctrl/tinycolor";
import { CalendarDataService } from "../calendar-data.service";
import { CalendarService } from "../calendar.service";
import { Events } from "../event.model";

@Component({
    selector: 'app-delete-event',
    templateUrl: './delete-event.component.html',
    styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {
    events: Events[] = [];

    constructor(
        public dialogRef: MatDialogRef<DeleteEventComponent>,
        private calendarService: CalendarService,
        private calendarDataService: CalendarDataService
    ) {}

    ngOnInit(): void {
        this.events = this.calendarService.getAllEvents();
    }

    close() {
        this.dialogRef.close();
    }

    getColorContrast(background): String {
        if (new TinyColor(background).getLuminance() > 0.179) {
          return '#000';
        } else {
          return '#fff';
        }
    }

    deleteEvent(index: number) {
        this.calendarService.deleteEvent(index);
        this.calendarDataService.saveEvents();
        this.calendarDataService.fetchEvents();
        this.events = this.calendarService.getAllEvents();
    }
}