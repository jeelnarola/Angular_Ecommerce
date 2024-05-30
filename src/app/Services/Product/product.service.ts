import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string='http://localhost:8090'
  constructor(private product:HttpClient) { }

  getProduct(){
    return this.product.get(`${this.url}/AllProduct`)
  }
  postproduct(data:any){
    return this.product.post(`${this.url}/productAdd`,data)
  }

}
