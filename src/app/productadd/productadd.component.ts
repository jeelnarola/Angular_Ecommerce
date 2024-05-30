import { formatDate } from '@angular/common';
import { ProductService } from './../Services/Product/product.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent {

  url:string='../../assets/Images/cloud-upload.jpg'
  url2:string='../../assets/Images/cloud-upload.jpg'
  url3:string='../../assets/Images/cloud-upload.jpg'
  url4:string='../../assets/Images/cloud-upload.jpg'
  formData = new FormData();
  selectedfile: File| any;
  selectedfile2: File| any;
  selectedfile3: File| any;
  selectedfile4: File| any;
  title:string|any;
  price:any
  description:any
  category:any;
  stock:string|any
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('fileInput2') fileInput2: any;
  @ViewChild('fileInput3') fileInput3: any;
  @ViewChild('fileInput4') fileInput4: any;
  product=new FormGroup({
    file:new FormControl('',[Validators.required]),
    file2:new FormControl('',[Validators.required]),
    file3:new FormControl('',[Validators.required]),
    file4:new FormControl('',[Validators.required]),
    title:new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    category:new FormControl('',[Validators.required]),
    stock:new FormControl('',[Validators.required]),     
  })
  constructor(private ProductService:ProductService,private http:HttpClient) { 
  }

  file1(){
    this.fileInput.nativeElement.click();
  }
  file2(){
    this.fileInput2.nativeElement.click();
  }
  file3(){
    this.fileInput3.nativeElement.click();
  }
  file4(){
    this.fileInput4.nativeElement.click();
  }
  onFileChange(valu:any){  
    this.selectedfile=valu.target.files[0] 
    var render=new FileReader()
      render.readAsDataURL(valu.target.files[0])
      render.onload=(vent:any)=>{
        this.url=vent.target.result
      }
    }
    onFileChange2(valu:any){  
      console.log(valu);
      this.selectedfile2=valu.target.files[0] 
      var render=new FileReader()
        render.readAsDataURL(valu.target.files[0])
        render.onload=(vent:any)=>{
          this.url2=vent.target.result
        }
    }
    onFileChange3(valu:any){  
        this.selectedfile3=valu.target.files[0] 
        var render=new FileReader()
          render.readAsDataURL(valu.target.files[0])
          render.onload=(vent:any)=>{
            this.url3=vent.target.result
          }
    }
    onFileChange4(valu:any){  
          this.selectedfile4=valu.target.files[0] 
          var render=new FileReader()
            render.readAsDataURL(valu.target.files[0])
            render.onload=(vent:any)=>{
              this.url4=vent.target.result
            }
    }
    onUpload(){
      const formData = new FormData();
      this.title=this.product.value.title
      this.price=this.product.value.price
      this.description=this.product.value.description
      this.category=this.product.value.category
      this.stock=this.product.value.stock
      console.log(this.product.value.stock);
      
    formData.append('img',this.selectedfile);
    formData.append('img',this.selectedfile2);
    formData.append('img',this.selectedfile3);
    formData.append('img',this.selectedfile4);
    formData.append('title',this.title);
    formData.append('price',this.price);
    formData.append('description',this.description);
    formData.append('category',this.category);
    formData.append('stock',this.stock)
  
    
      this.ProductService.postproduct(formData).subscribe((res)=>{
        this.product.reset()
        console.log("res",res);})
      
  }
  get titleValidation(){return this.product.get('title')}
  get pricewordValidation(){return this.product.get('price')}
  get descriptionValidation(){return this.product.get('description')}
  get CategoryValidation(){return this.product.get('category')}

} 
