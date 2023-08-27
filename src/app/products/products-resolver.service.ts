import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ProductsDataService } from "./products-data.service";
import { Products } from "./products.model";
import { ProductsService } from "./products.service";

@Injectable({providedIn:'root'})
export class ProductsResolverService implements Resolve<Products[]> {

    constructor(
        private productsDataService: ProductsDataService,
        private productsService: ProductsService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Products[] | Observable<Products[]> | Promise<Products[]> {
        const products = this.productsService.getAllProducts();

        if (products.length === 0) {
            return this.productsDataService.fetchProducts();
        } else {
            return products;
        }
    }
}