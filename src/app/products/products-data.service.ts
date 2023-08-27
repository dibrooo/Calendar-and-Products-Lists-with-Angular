import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Products } from "./products.model";
import { ProductsService } from "./products.service";

@Injectable({
    providedIn: 'root'
})
export class ProductsDataService {
    
    constructor(
        private http: HttpClient,
        private productsService: ProductsService
    ) {}



    saveProducts() {
        const products = this.productsService.getAllProducts();
        this.http
            .put(
                'https://ng-practicing-default-rtdb.firebaseio.com/products.json', products
            )
            .subscribe(response => {
                console.log(response);
            })
    }

    fetchProducts() {
        return this.http
        .get<Products[]>(
            'https://ng-practicing-default-rtdb.firebaseio.com/products.json'
        )
        .pipe(
            tap(products => {
                this.productsService.setProducts(products);
            })
        )
    }
}