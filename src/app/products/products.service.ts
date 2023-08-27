import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Products } from "./products.model";

@Injectable()
export class ProductsService {
    productsChanged = new Subject<Products[]>();
    private products: Products[] = [];

    constructor() {}



    getAllProducts() {
        return this.products.slice();     
    }

    getProduct(index: number) {
        return this.products[index];
    }

    setProducts(products: Products[]) {
        this.products = products;
        this.productsChanged.next(this.products.slice());
    }



    addProduct(product: Products) {
        this.products.push(product);
        this.productsChanged.next(this.products.slice());
    }

    deleteProduct(index: number) {
        this.products.splice(index, 1);
        this.productsChanged.next(this.products.slice());
    }

    updateProduct(index: number, editProduct: Products) {
        this.products[index] = editProduct;
        this.productsChanged.next(this.products.slice());
    }
}