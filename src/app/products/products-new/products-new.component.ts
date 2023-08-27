import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ProductsDataService } from "../products-data.service";
import { ProductsService } from "../products.service";

@Component({
    selector: 'app-products-new',
    templateUrl: './products-new.component.html',
    styleUrls: ['./products-new.component.css']
})
export class ProductsNewComponent implements OnInit {
    productForm: FormGroup;
    id: number;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private productsService: ProductsService,
        private productsDataService: ProductsDataService
    ) {}



    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = +params['id'];
            this.initForm();
        })
    }

    private initForm() {
        let productName = '';
        let productDescription = '';
        let productPrice = '';
        let productImagePath = '';

        this.productForm = new FormGroup({
            name: new FormControl(productName, Validators.required),
            description: new FormControl(productDescription, Validators.required),
            price: new FormControl(productPrice, Validators.required),
            imagePath: new FormControl(productImagePath, Validators.required)
        });
    }



    onSubmit() {
        this.productsService.addProduct(this.productForm.value);
        this.productsDataService.saveProducts();
        this.productsDataService.fetchProducts();
        this.onCancel();
    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }
}