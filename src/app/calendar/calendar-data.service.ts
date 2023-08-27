import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { CalendarService } from "./calendar.service";
import { Events } from "./event.model";

@Injectable({
    providedIn: 'root'
})
export class CalendarDataService {

    constructor(
        private http: HttpClient,
        private calendarService: CalendarService
    ) {}



    /*
        =============================
         EVENTS DATABASE INTERACTION
        =============================
    */
    saveEvents() {
        const events = this.calendarService.getAllEvents();
        this.http.put('https://ng-practicing-default-rtdb.firebaseio.com/events.json', events).subscribe()
    }

    fetchEvents() {
        return this.http.get<Events[]>('https://ng-practicing-default-rtdb.firebaseio.com/events.json')
            .pipe(tap(events => {
                this.calendarService.setEvents(events)
            }))
    }



    /*
        ===========================
         TAGS DATABASE INTERACTION
        ===========================
    */
    saveTags() {
        const tags = this.calendarService.getAllTags();
        this.http.put('https://ng-practicing-default-rtdb.firebaseio.com/tags.json', tags).subscribe();
    }

    fetchTags() {
        return this.http.get<String[]>('https://ng-practicing-default-rtdb.firebaseio.com/tags.json')
            .pipe(tap(tags => {
                this.calendarService.setTags(tags)
            }))
    }
}