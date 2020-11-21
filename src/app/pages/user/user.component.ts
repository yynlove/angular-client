import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';

interface jichu{
  id: number;
}

interface ItemData extends jichu {

  userName: string;
  age: number;
  address: string;
}

interface User extends jichu{
  address: string;
  password: string;
  confrim: string;
  gender:string;
  account:string;
  userName: string;
  age: number;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ItemData[] = [];
  listOfData: ItemData[] = [];
  setOfCheckedId = new Set<number>();
  visible = false;
  editCache: { [key: number]: { edit: boolean; data: ItemData } } = {};

  validateForm : FormGroup;




  open(): void {
    this.visible = true;
  }



  close(e:MouseEvent= null): void {
    if(e!==null){
      e.preventDefault()
    };
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.visible = false;

  }

  /**
   *
   * 新增提交表单
   */
   submitForm(value: User): void {

    this.listOfData=[ {id:new Date().getTime(),
      userName:this.validateForm.controls.userName.value,
      age:this.validateForm.controls.age.value,
      address:this.validateForm.controls.address.value
    },
      ...this.listOfData
     ];
    this.updateEditCache();
    this.validateForm.reset();
    //这里不会又一次触发formControl的异步校验事件
    //手动更改表单状态时，例如 markAsDirty 后，需要执行 updateValueAndValidity 通知 nz-form-control 进行状态变更。
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.visible = false;

  }


  userNameAsyncValidator = (control:FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'yuanyenan') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
        console.log("校验名字")
      }, 1000);
  });


  confirmValidator = (control :FormControl): {[s:string]:boolean} =>{
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};

  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  constructor(private nzMessageService:NzMessageService,private fb: FormBuilder) {
      this.validateForm = this.fb.group({
        userName:['',[Validators.required], [this.userNameAsyncValidator]],
        age:['',[Validators.required]],
        password:['',[Validators.required]],
        confirm:['',[this.confirmValidator]],
        gender:['',[Validators.required]],
        account:['',[Validators.required]],
        address:['',[Validators.required]]
      });



   }


  listOfSelection = [
    {
      text: '选择所有行',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: '选择偶数行',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: '选择奇数行',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];





  startEdit(id: number): void {
    this.editCache[id].edit = true;
    console.log('this.editCache[id].data',this.editCache[id].data);

  }


  saveEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;

    this.nzMessageService.info('编辑成功！');
  }

  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  delete(id:number):void{
    this.listOfData = this.listOfData.filter(d => d.id !== id);
    if(this.setOfCheckedId.has(id)){
      this.setOfCheckedId.delete(id);
    }
    this.nzMessageService.info("删除成功！");

  }



  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    console.log('onItemChecked',checked);

    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    console.log('onAllChecked',value);

    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: ItemData[]): void {
    console.log('onCurrentPageDataChange',$event);

    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  ngOnInit(): void {
    this.listOfData = new Array(20).fill(0).map((_, index) => {
      return {
        id: index,
        userName: `Edward King ${index}`,
        age: 32,
        address: `London, Park Lane no. ${index}`
      };
    });
    this.updateEditCache();
    console.log('this.editCache',this.editCache);

  }


  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });

  }
}
