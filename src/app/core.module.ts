import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AuthInterceptorService } from "./auth/auth.interceptor.service";
import { AuthService } from "./auth/auth.service";
import { ProductsService } from "./products/products.service";
import { ProductsDataService } from "./products/products-data.service";
import { ProductsResolverService } from "./products/products-resolver.service";
import { CalendarService } from "./calendar/calendar.service";
import { CalendarDataService } from "./calendar/calendar-data.service";
import { ColorContrastService } from "./shared/color-contrast.service";

@NgModule({
    providers: [
        AuthService,
        ProductsService,
        ProductsDataService,
        ProductsResolverService,
        CalendarService,
        CalendarDataService,
        ColorContrastService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ]
})
export class CoreModule {}