import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileSelectDirective, FileDropDirective, FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uploader: FileUploader;
  submitted: boolean=false;
  ngOnChanges(){
    
  }
  constructor(
              private  ProfileService: ProfileService,
              private router: Router,
              private notifyService : NotificationService
              ) { }
 
  url:string
  userInfo
  userUpdated:{username:string,email:string,password:string,gender:string}
  orders=[]
 
  image
  myForm = new FormGroup({
    username:new FormControl('',[Validators.minLength(4)]),
    email:new FormControl('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password:new FormControl('',[Validators.minLength(6)]),
    confirmPassword:new FormControl(['', Validators.minLength(6)]),
    gender:new FormControl('',[])
      })
   ngOnInit(): void {
    this.getInfo()
    this.getOrders()
    
   // console.log(localStorage.getItem('Token'))
  }
 
  onFileChanged(event) {
    this.image = <File>event.target.files[0];
    
    
    let uploadData=new FormData()
    uploadData.append('image', this.image);
   
    
        console.log(this.image)

    this.ProfileService.updateImage(uploadData )
    .subscribe(
      res =>
      {
        this.notifyService.showSuccess("Image updated successfuly", "Image")
         this.url=res.body.image;
         console.log(res)
        },
      err => alert(err.error)
    );
  }
  
  getInfo(){
    this.ProfileService.getUserInfo()
    .subscribe(
     async res =>
      {
        this.userInfo=res.body;
        this.url=res.body.image;
         console.log(res)
         console.log(this.userInfo)
        },
      err => {
        alert(err.error)
         this.url="https://bootdey.com/img/Content/avatar/avatar7.png"
      }
    );
  }
  updateInfo(){
    this.submitted = true;
    if(this.myForm.valid)
    {

    console.log(this.myForm.value)
      
      this.ProfileService.updateInfo(this.myForm.value)
      .subscribe(
        async res=>
        {
          this.notifyService.showSuccess("User Info updated successfuly", "Info Update")
          this.userInfo=res.body.user
          this.myForm.reset();
        }
        ,err => alert(err.error)
      )
    }
  }

  Cancel(){
    this.myForm.reset();
  }
  getOrders(){
    this.ProfileService.getOrders()
    .subscribe(
     async res =>
      {
        await res.body.forEach(element => this.orders.push(element));
         console.log(res)
        
        },
      err => alert(err.error)
    );
  }
  DeleteUser()
  {
    this.ProfileService.deleteUser()
    .subscribe(
     async res =>
      {
        alert(res)
         console.log(res)
         localStorage.removeItem('Token')
         this.router.navigateByUrl("/register")
        
        },
      err => alert(err.error)
    );
  }
}
