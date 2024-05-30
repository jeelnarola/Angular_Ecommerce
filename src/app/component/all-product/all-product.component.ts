import { ProductService } from './../../Services/Product/product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent {

  constructor(private productService:ProductService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.productAll()
  }
  productAll(){
    this.productService.getProduct().subscribe((res:any)=>{
      console.log(res);
      
    })
  }
}
