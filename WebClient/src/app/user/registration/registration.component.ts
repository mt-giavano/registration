import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr:ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();

  }

  onSubmit(){
    this.service.register().subscribe(
      (res:any) => {
        if (res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('User has been created'),'Registration Succeed';
        } 
        else {
          
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration Failed');
                break;
            
              default:
                this.toastr.error(element.description,'Registration Failed');
                break;
            }
          });

        }
      } ,
      err => {
        console.log(err);
      } 
    )
  }
}
