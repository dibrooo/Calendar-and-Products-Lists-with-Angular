import { NgModule } from "@angular/core";
import { ColorContrastService } from "./color-contrast.service";

import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
    ],
    exports: [
        LoadingSpinnerComponent,
    ]
})
export class SharedModule {}