import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css', '../cart/cart.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private route:Router,
    private OrderService: OrderService
  ) { }
  orderFlag:boolean;
  productImg: string = '/assets/img/products/1.png';
  orders: [];
  priceImg: string = '/assets/img/5.png';
  page: Number = 1;
  totalOrders: number;
  ngOnInit(): void {
    this.OrderService.allOrders().subscribe((response) => {
      this.orders = response;
      this.totalOrders = this.orders.length;
      if(this.orders.length == 0) this.orderFlag = false;
      else this.orderFlag = true;
    });
  }

  //navigate to home
  goHome() {
    this.route.navigateByUrl('/');
  }

  //cancel product
  cancelOrder(_order){
    if (confirm(`Are you sure you want to cancel the selected order?`)) {
      this.OrderService.cancelOrder(_order).subscribe(
        () => {
          this.ngOnInit();
          this.route.navigateByUrl('/order');
        }),
        err => {
          console.log(err);
        }
    }
  }

}
