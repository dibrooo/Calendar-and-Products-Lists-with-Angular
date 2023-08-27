import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsDataService } from "../products-data.service";

import { Products } from "../products.model";
import { ProductsService } from "../products.service";

@Component({
    selector: 'app-products-detail',
    templateUrl: './products-detail.component.html',
    styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit {
    @Input() product: Products;
    @Input() editMode: boolean;
    changeImage = false;
    productsArray: Products[] = this.productsService.getAllProducts();
    editForm: FormGroup;
    id: number;

    constructor(
        private productsService: ProductsService,
        private productsDataService: ProductsDataService,
        public dialogRef: MatDialogRef<ProductsDetailComponent>,
    ) {}



    ngOnInit(): void {
        this.id = this.productsArray.indexOf(this.product);

        this.initForm();
    }



    closeDetails() {
        this.dialogRef.close();
    }

    saveEdit() {
        this.productsService.updateProduct(this.id, this.editForm.value);
        this.productsDataService.saveProducts();
        this.closeDetails();
    }



    private initForm() {
        let productName = '';
        let productDescription = '';
        let productPrice = '';
        let productImagePath = '';

        const product = this.productsService.getProduct(this.id);
        productName = product.name;
        productDescription = product.description;
        productPrice = product.price;
        productImagePath = product.imagePath;

        this.editForm = new FormGroup({
            name: new FormControl(productName, Validators.required),
            description: new FormControl(productDescription, Validators.required),
            price: new FormControl(productPrice, Validators.required),
            imagePath: new FormControl(productImagePath, Validators.required)
        });
    }
}