import { Component, OnInit , ElementRef, Renderer2,} from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import {OrderService} from '../../services/order.service';
import { NotificationService } from '../../services/notification.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css', '../cart/cart.component.css']
})

export class ProductComponent implements OnInit {
    token = localStorage.getItem("Token");
    isAdmin: boolean = localStorage.getItem("isAdmin") == "true";
    user: boolean = localStorage.getItem('Token') != null;
    isAdding: boolean;
    totalProducts: number;
    allProducts = [];
    products = [];
    buttons
    productImg: string = '/assets/img/products/2.png';
    page: Number = 1;
    closeResult: string;
    constructor(
        private http: HttpClient,
        private ProductService: ProductService,
        private OrderService:OrderService,
        private CartService: CartService,
        private notifyService: NotificationService,
        private modalService: NgbModal,
       
    ) { }
    ngOnInit(): void {
        this.isAdding = false;
        this.getAllProducts();
        console.log(this.isAdmin);
    }

    getAllProducts() {
        this.ProductService.allProducts().subscribe((response) => {
          
            this.allProducts = response['products'];
            this.buttons = Array(this.allProducts.length).fill(false); 
            this.products = this.allProducts;
            this.totalProducts = this.products.length;
        }),
            err => {
                console.log(err);
            };
    }
    //Comes from add-product component
    addProductEvent(event) {
        this.products.push(event);
    }
    removeProduct(productId, index) {
        
        this.OrderService.ifProduct(productId).subscribe((res)=>{
            console.log(res)
            if(res==0)
            {
                const sure = confirm("Are you sure to delete this product ?");

        if (sure == true) {
            this.http.delete(environment.api + '/api/product/' + productId)
                .subscribe(res => {
                    this.getAllProducts()
                },
                    err => {
                        console.log(err)
                    })
        }
            }
            else
            {
                this.notifyService.showWarning("Can't delete this product ... it already exists in an order", "Delete Product")
            }
        })

      
    }

    //add product to cart
    addCart(id,index) {
       
        this.CartService.addProduct(id).subscribe(Response => {
            this.buttons[index]=true;
            this.notifyService.showSuccess("Product added successfuly ", "Add to cart")
            console.log(Response)
        }),
            err => console.log(err)
    }

    //search for product
    search(e) {
        this.products = this.allProducts;
        this.products = this.allProducts.filter((element) => {
            return element.title.toLowerCase().includes(e.value.toLowerCase());
        });
    }

    //open image
    image: string;
    imageId(_image) {
        this.image = _image;
    }
    openImage(_image) {
        this.modalService.open(_image, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }


    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
   
}