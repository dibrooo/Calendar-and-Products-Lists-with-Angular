import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AuthComponent } from "./auth.component";
import { AlertComponent } from "./alert/alert.component";
import { PlaceholderDirective } from "./placeholder.directive";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        AuthComponent,
        AlertComponent,
        PlaceholderDirective
    ],
    imports: [
        FormsModule,
        CommonModule,
        SharedModule,
        RouterModule.forChild([{ path: '', component: AuthComponent }])
    ]
})
export class AuthModule {}