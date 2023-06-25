import { Component,OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentdetail',
  templateUrl: './studentdetail.component.html',
  styleUrls: ['./studentdetail.component.css']
})
export class StudentdetailComponent implements OnInit {
  displayedColumns: string[]=['Personal Details'];
  
  public employeeFormGroup=this.formBuilder.group({
    'employee_name':[],
    'employee_age':[],
    'designation':[],
    'email':[],
    'dob':[],
    '_id':[],
    '_rev':[],
  });
  constructor(private formBuilder:FormBuilder,public student:StudentService,private router:Router)
  {

  }
ngOnInit():void{

}

saveAction(){
  if(this.employeeFormGroup.valid){
    let object:any=this.employeeFormGroup.value;
    object['object_name']='employee'
    if(object['_id']==null){
      delete object['_id']
    }
    if(object['_rev']==null){
      delete object['_rev']
    }
    let _bulk_docsArray=[];
    _bulk_docsArray.push(object);
    this.student.updateDocument(_bulk_docsArray);
  }
  else{
    alert("some of fields not valid");
  }
}
fetchAction() {
  this.student.searchDocument('object_name:employee')
}

editAction(object: any) {
  this.employeeFormGroup.reset()
  this.employeeFormGroup.patchValue(object)
}

deleteAction(object: any) {
  this.student.deleteDocument(object['_id'], object['_rev'])
}
resetAction() {
  this.employeeFormGroup.reset()
  this.employeeFormGroup.markAsUntouched()
} 

}
