import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css', '../cart/cart.component.css', '../order/order.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    private route: Router,
    private OrderService: OrderService
  ) { }
  
  isAdmin: boolean = localStorage.getItem("isAdmin") == "true";
  orderFlag: boolean = false;
  productImg: string = '/assets/img/products/1.png';
  orders: [];
  priceImg: string = '/assets/img/5.png';
  orderID;
  totalOrders: number;
  page: Number = 1;
  ngOnInit(): void {
    this.OrderService.adminOrders().subscribe((response) => {
      this.orders = response;
      this.totalOrders = this.orders.length;
      if (this.orders.length == 0) this.orderFlag = false;
      else this.orderFlag = true;
    }),
      err => {
        console.log(err);
      };
  }

  //change order status
  //get order id to change
  orderId(id) {
    this.orderID = id;
  }
  orderStatus(status) {
    this.OrderService.orderStatus(this.orderID, status).subscribe((Response) => {
      this.ngOnInit();
    }),
      err => {
        console.log(err);
      }
  }
}
