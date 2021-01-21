import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { User } from 'src/app/services/data-typs/data';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: User[];
  listOfData: User[];
  setOfCheckedId = new Set<number>();
  visible = false;
  editCache: { [key: number]: { edit: boolean; data: User } } = {};
  modalFrom : FormGroup;


  constructor(private nzMessageService:NzMessageService,private fb: FormBuilder,private userService:UserService) {

    this.modalFrom = this.fb.group({
      userName:['',[Validators.required], [this.userNameAsyncValidator]],
      age:['',[Validators.required]],
      password:['',[Validators.required]],
      confirm:['',[this.confirmValidator]],
      gender:['',[Validators.required]],
      account:['',[Validators.required]],
      address:['',[Validators.required]]
    });

 }


 ngOnInit(): void {
  this.userService.getUsersInfo().subscribe(user =>{
    this.listOfData = user;
    console.log('this.listOfData',this.listOfData);
    this.updateEditCache();
  });


}



  /**
   * 打开新增面板
   */
  open(): void {
    this.visible = true;
  }


  /**
   * 关闭新增面板
   * @param e
   */
  close(e:MouseEvent= null): void {
    if(e!==null){
      e.preventDefault()
    };
    this.modalFrom.reset();
    for (const key in this.modalFrom.controls) {
      this.modalFrom.controls[key].markAsPristine();
      this.modalFrom.controls[key].updateValueAndValidity();
    }
    this.visible = false;

  }

  /**
   *
   * 新增提交表单
   */
   submitForm(value: User): void {

    this.listOfData=[
      {id:new Date().getTime(),
      userName:this.modalFrom.controls.userName.value,
      age:this.modalFrom.controls.age.value,
      address:this.modalFrom.controls.address.value
    },
      ...this.listOfData
     ];
    this.updateEditCache();
    this.modalFrom.reset();
    //这里不会又一次触发formControl的异步校验事件
    //手动更改表单状态时，例如 markAsDirty 后，需要执行 updateValueAndValidity 通知 nz-form-control 进行状态变更。
    for (const key in this.modalFrom.controls) {
      this.modalFrom.controls[key].markAsDirty();
      this.modalFrom.controls[key].updateValueAndValidity();
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
      }, 1000);
  });


  confirmValidator = (control :FormControl): {[s:string]:boolean} =>{
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.modalFrom.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};

  }

  validateConfirmPassword(): void {
    setTimeout(() => this.modalFrom.controls.confirm.updateValueAndValidity());
  }


  /**
   * 编辑
   * @param id
   */
  editClick(id: number): void {
    this.editCache[id].edit = true;
  }



  /**
   * 保存编辑
   * @param id
   */
  saveEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    //Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
    this.nzMessageService.info('编辑成功！');
  }

  /**
   * 取消编辑
   * @param id
   */
  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  /**
   * 删除
   * @param id
   */
  delete(id:number):void{
    this.listOfData = this.listOfData.filter(d => d.id !== id);
    if(this.setOfCheckedId.has(id)){
      this.setOfCheckedId.delete(id);
    }
    this.nzMessageService.info("删除成功！");
  }


  /**
   * 修改选择的状态
   * @param id
   * @param checked
   */
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  /**
   * 选择一条记录
   * @param id
   * @param checked
   */
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  /**
   * 选择所有
   * @param value
   */
  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();

  }

  /**
   *
   * @param $event 当前页面数据改变时 回调
   */
  onCurrentPageDataChange($event: User[]): void {

    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }


  /**
   * 刷新修改状态
   */
  private refreshCheckedStatus(): void {
    //every 每一个都进行比较
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    //some 只要有一个比较为true 就返回true
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }



  /**
   * 更新数组编辑状态
   */
  private updateEditCache(): void {

    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });

  }
}
