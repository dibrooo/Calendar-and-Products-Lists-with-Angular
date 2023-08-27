import { Component, OnInit } from "@angular/core";
import { CalendarService } from "../calendar.service";
import { Events } from "../event.model";

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
    eventId: number;
    event: Events;
    textColor: String;

    constructor(
        private calendarService: CalendarService
    ) {}

    ngOnInit(): void {
        this.event = this.calendarService.getEvent(this.eventId);
    }
}