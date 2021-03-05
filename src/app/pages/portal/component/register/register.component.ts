import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModelType } from 'src/app/services/data-typs/data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  @Output() onModelTypeChange = new EventEmitter<number>();

  ngOnInit(): void {
  }


  typeChange(){
    this.onModelTypeChange.emit(ModelType.Login);
  }

}
