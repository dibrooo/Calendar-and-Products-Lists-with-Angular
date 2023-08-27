import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CalendarComponent } from "./calendar.component";
import { AddEventComponent } from "./add-event/add-event.component";
import { ChangeEventComponent } from "./change-event/change-event.component";
import { DeleteEventComponent } from "./delete-event/delete-event.component";
import { EventDetailsComponent } from "./event-details/event-details.component";

@NgModule({
    declarations: [
        CalendarComponent,
        AddEventComponent,
        ChangeEventComponent,
        DeleteEventComponent,
        EventDetailsComponent
    ],

    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([{ path: '', component: CalendarComponent }]),
    ]
})

export class CalendarModule {}