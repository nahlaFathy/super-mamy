import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private _HttpClient: HttpClient,
  ) { }
  private baseURL: string = `${environment.api}/api/cart/`

  //get all products in user cart
  public allProducts(): Observable<any> {
    return this._HttpClient
      .get(`${this.baseURL}`)
  }

  //delete one product from cart
  public deleteProduct(id: string): Observable<any> {
    return this._HttpClient
      .delete(`${this.baseURL}${id}`,{responseType: 'text'})
  }

  //add product to cart
  public addProduct(_product: string): Observable<any> {
    return this._HttpClient
      .post(
        `${this.baseURL}`,
        { _product },
        { responseType: "text" }
      )
  }

  //checkout to order
  public checkout(_product, totalPrice): Observable<any> {
    return this._HttpClient
      .post(
        `${this.baseURL}/checkout`,
        { _product, totalPrice },
        { responseType: "text" }
      )
  }

}