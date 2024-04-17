import { Component } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-service';
  token: string = ''; 
  product = {id:0, name: '', manufacturer: '', price: 0 ,};
  products: any[] = [];
  constructor(private authService: AuthService){

  }
  fetchToken():void{
    this.authService.getToken().subscribe(data=>{
      this.token=data.access_token;
      console.log('Token received: ',data);
    },error=>{
      console.error('Error fetching token: ',error);
    })
  }
  getProducts(): void {
    this.authService.getProducts().subscribe(data=>{
      this.products = data;
      console.log('Products received:', data);
    }, error => {
      console.error('Error fetching products:', error);
    });
    
  }
  createProduct(): void {
    this.authService.createProduct(this.product).subscribe(response => {
      console.log('Product created:', response);
    }, error => {
      console.error('Error creating product:', error);
    });
  }
  updateProduct(): void {
    this.authService.updateProduct(this.product.id, this.product).subscribe(response => {
      console.log('Product updated:', response);
    }, error => {
      console.error('Error updating product:', error);
    });
  }

  deleteProduct(): void {
    this.authService.deleteProduct(this.product.id).subscribe(response => {
      console.log('Product deleted:', response);
    }, error => {
      console.error('Error deleting product:', error);
    });
  }
}
