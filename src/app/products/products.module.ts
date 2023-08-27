import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';

import { AuthGuard } from "../auth/auth.guard";
import { ProductsComponent } from "./products.component";
import { ProductsNewComponent } from "./products-new/products-new.component";
import { ProductsDetailComponent } from "./products-detail/products-detail.component";
import { SharedModule } from "../shared/shared.module";
import { PlaceholderDirective } from "./placeholder.directive";

@NgModule({
    declarations: [
        ProductsComponent,
        ProductsNewComponent,
        ProductsDetailComponent,
        PlaceholderDirective
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        SharedModule,
        MatDialogModule,
        RouterModule.forChild([
            { path: '', component: ProductsComponent, },
            { path: 'new', component: ProductsNewComponent, canActivate:[AuthGuard] }
        ])
    ],
    exports: [
        ProductsNewComponent
    ]
})
export class ProductsModule {}