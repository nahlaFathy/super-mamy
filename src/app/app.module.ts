declare var require: any
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent} from './app.component'
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderComponent } from './components/order/order.component';
import { SliderComponent } from './components/home/slider/slider.component';
import { EventEmitterService } from './services/event-emitter.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuardService } from './services/auth-guard.service';
import { LogginAuthGuardService } from './services/loggin-auth-guard.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { OrdersComponent } from './components/orders/orders.component';
import { AboutComponent } from './components/about/about.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminAuthService } from './services/admin-auth.service';
import { UserAuthService } from './services/user-auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
 
  { path: '', component: HomeComponent ,
    children:[{path:'', component:SliderComponent},
  { path:'',component:ProductComponent,children:[{path:'',component:AddProductComponent}]} ]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent, canActivate: [LogginAuthGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [LogginAuthGuardService] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService, UserAuthService] },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuardService, UserAuthService] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuardService, AdminAuthService] },
  { path: 'about', component: AboutComponent },
  { path: '**', component: ErrorComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    FooterComponent,
    NavbarComponent,
    OrderComponent,
    CartComponent,
    SliderComponent,
    AboutComponent,
    OrdersComponent,
    AddProductComponent,
    ErrorComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule

  ],
  providers: [
    AuthGuardService,
    UserAuthService,
    AdminAuthService,
    LogginAuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    EventEmitterService,
  ],
  exports: [ RouterModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
