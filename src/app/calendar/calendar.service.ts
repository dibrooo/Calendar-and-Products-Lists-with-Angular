import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Events } from "./event.model";

@Injectable()
export class CalendarService {
    /*
        ==============
         DECLARATIONS
        ==============
    */
    eventsChanged = new Subject<Events[]>();
    tagsChanged = new Subject<String[]>();

    private events: Events[] = [];
    private tags: String[] = [];

    constructor() {}



    /*
        ==================
         EVENTS FUNCTIONS
        ==================
    */
    getAllEvents() {
        return this.events.slice();
    }

    getEvent(index: number) {
        return this.events[index];
    }

    setEvents(events: Events[]) {
        this.events = events;
        this.eventsChanged.next(this.events.slice());
    }
    
    addNewEvent(event: Events) {
        this.events.push(event);
        this.eventsChanged.next(this.events.slice());
    }

    deleteEvent(index: number) {
        this.events.splice(index, 1);
        this.eventsChanged.next(this.events.slice());
    }

    changeDate(newDate: string, index: number) {
        this.events[index].date = newDate;
        this.eventsChanged.next(this.events.slice());
    }



    /*
        ================
         TAGS FUNCTIONS
        ================
    */
    getAllTags() {
        return this.tags.slice();
    }

    setTags(tags: String[]) {
        this.tags = tags;
        this.tagsChanged.next(this.tags.slice());
    }

    addNewTag(tag: String) {
        this.tags.push(tag);
        this.tagsChanged.next(this.tags.slice());
    }

    deleteTag(tag: String) {
        const tagId = this.tags.indexOf(tag);
        this.tags.splice(tagId, 1);
        this.tagsChanged.next(this.tags.slice());
    }
}