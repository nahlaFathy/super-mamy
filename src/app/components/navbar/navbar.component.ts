import { Component, OnInit, } from '@angular/core';
import {  Router } from '@angular/router';
import { EventEmitterService } from '../../services/event-emitter.service'; 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  

  constructor(private router: Router,private eventEmitterService: EventEmitterService  ) { }
 action:string ="Sign In"
 iconClass:string="fas fa-sign-in-alt fa-lg"
 root:string="/login"
 isAdmin: boolean
 user: boolean
  ngOnInit(): void {
    this.isAdmin = localStorage.getItem("isAdmin") == "true";
    this.user=localStorage.getItem('Token')!=null;
    this.checkToken()
    ///// listen to login component  to check tokens
    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeFirstComponentFunction.subscribe((name:string) => {    
        console.log("emitted")
        this.checkToken();    
        this.user=true
        this.isAdmin= localStorage.getItem("isAdmin") == "true";
      });    
    }   
  }
  ngOnChanges() {
    console.log("change...")
    this.checkToken
  }
  onClick(){
    
   console.log(this.action)
      if(this.action=="Profile"){
      this.root="/profile"
    }
    else
    {
      this.root="/login"
    
    }
  }
  
   checkToken(){
    if(localStorage.getItem('Token')!=null||localStorage.getItem('Token')!=undefined)
    {
      this.action='Profile'
      this.iconClass='far fa-user-circle fa-lg'
    }
    else{
      this.action="Sign In"
      this.iconClass="fas fa-sign-in-alt fa-lg"
    }
  }
  logOut(){
    localStorage.removeItem('Token')
    console.log(localStorage.getItem('Token'))
  }
}
