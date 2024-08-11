import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit 
{
  resourceForm!:FormGroup;
  @Output () addResourse=new EventEmitter<any>();
  constructor(private http:HttpService,private fb:FormBuilder,private router:Router)
  {

  }
  ngOnInit(): void {
    this.resourceForm=this.fb.group(
      {
        
        name:["",[Validators.required]],
        type:["",[Validators.required]],
        

      }
    );
  }
  
  onSubmit()
  {
    if(this.resourceForm.valid)
    {
      this.http.addResource(this.resourceForm.value).subscribe(res=>
        {
          this.router.navigateByUrl('resource-allocate')
        });
    }
    return null;
    
  }

}
//todo: complete missing code..
