import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appPlaceholderProducts]'
})
export class PlaceholderDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}