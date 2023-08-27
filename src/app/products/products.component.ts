import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { PlaceholderDirective } from './placeholder.directive';
import { ProductsDataService } from './products-data.service';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Products } from './products.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})

export class ProductsComponent implements OnInit, OnDestroy {
  products: Products[];
  isAuthenticated = false;
  saved = false;
  dataLoaded = false;
  editMode = false;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private productsSubscription: Subscription;
  private authSubscription: Subscription;
  private closeSubscription: Subscription;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private productsDataService: ProductsDataService,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) { }



  ngOnInit(): void {
    this.products = this.productsService.getAllProducts();
    this.productsSubscription = this.productsService.productsChanged.subscribe(
      (products: Products[]) => {
        this.products = products;
      }
    );
   
    this.authSubscription = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );
      
    this.onFetchData();
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }



  addNewProduct() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  deleteProduct(index: number) {
    this.productsService.deleteProduct(index);
  }



  onSaveData() {
    this.productsDataService.saveProducts();
    this.saved = true;
    setTimeout(() => {
      this.saved = false
    }, 1500)
  }

  onFetchData() {
    this.productsDataService.fetchProducts().subscribe();
  }



  editProduct(product: Products) {
    this.editMode = true;
    this.showProductDetail(product);
  }
  
  showProductDetail(product: Products) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = "products-detail-component";
    dialogConfig.height = "270px";
    dialogConfig.width = "600px";
    
    const detailDialog = this.matDialog.open(ProductsDetailComponent, dialogConfig);
    detailDialog.componentInstance.product = product;
    detailDialog.componentInstance.editMode = this.editMode;

    this.editMode = false;
  }

}