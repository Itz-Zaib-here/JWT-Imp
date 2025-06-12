import { Component } from '@angular/core';
import { ServicesService } from '../services.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: any[] = [];
  totalproducts: number = 0;

  constructor(private Service: ServicesService) {}

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.Service.getProducts().subscribe((data) => {
      this.products = data;
      this.totalproducts = this.products.length;
    });
  }
  deleteProducts(id: string) {
    const confirmation = confirm(
      `Are you sure you want to delete user with ID ${id}?`
    );
    if (confirmation) {
      this.Service.deleteProduct(id).subscribe({
        next: (res) => {
          console.log('Delete response: Success');
          alert('Delete response: Success');
          this.getProducts();
        },
        error: (err) => {
          console.error('Delete failed', err);
          alert('Failed to delete user');
        },
      });
    }
  }
}
