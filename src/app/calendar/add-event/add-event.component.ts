import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { CalendarDataService } from "../calendar-data.service";
import { CalendarService } from "../calendar.service";

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.css']
})

export class AddEventComponent implements OnInit, OnDestroy {
    eventForm: FormGroup;
    datePlaceholder: String = '';
    tagInput: FormGroup;
    tags: String[];
    currentTag: String;
    tagSubscription: Subscription;

    constructor(
        public dialogRef: MatDialogRef<AddEventComponent>,
        private calendarService: CalendarService,
        private dataService: CalendarDataService
    ) {}



    ngOnInit(): void {
        this.tags = this.calendarService.getAllTags();
        this.currentTag = this.tags[0];

        this.tagSubscription = this.calendarService.tagsChanged.subscribe(
            (tags: String[]) => {
                this.tags = tags;
            }
        );

        this.onFetchTags();
        this.initForm();
    }

    ngOnDestroy(): void {
        this.tagSubscription.unsubscribe();
    }

    private initForm() {
        this.eventForm = new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl(''),
            tag: new FormControl(this.tags[0], Validators.required),
            date: new FormControl(this.datePlaceholder, Validators.required),
            time: new FormControl('', Validators.required),
            color: new FormControl('#e66465', Validators.required)
        })
    }



    onSubmit() {
        this.calendarService.addNewEvent(this.eventForm.value);
        this.dataService.saveEvents();
        this.dataService.fetchEvents();
        this.close();
    }

    close() {
        this.dialogRef.close();
    }



    addNewTag(event: any) {
        this.calendarService.addNewTag((event.target.querySelector('input')).value);
        this.dataService.saveTags();
        this.dataService.fetchTags();

        (event.target.querySelector('input')).value = '';
    }

    deleteTag() {
        this.calendarService.deleteTag(this.currentTag);
        this.dataService.saveTags();
    }

    onFetchTags() {
        this.dataService.fetchTags().subscribe();
    }
}