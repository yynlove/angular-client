import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Observer, of, timer } from 'rxjs';
import { User } from 'src/app/services/data-typs/data';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  //是否选中
  checked = false;
  //账户校验状态
  indeterminate = false;
  listOfCurrentPageData: User[];
  //数据表格数据
  listOfData: User[];
  setOfCheckedId = new Set<number>();
  visible = false;
  editCache: { [key: number]: { edit: boolean; data: User } } = {};
  //新增数据表单
  modalFrom : FormGroup;
  pageIndex :number = 1;
  pageSize :number = 10;
  //数据是否加载中
  loading :boolean =true;
  //数据总条数
  pageTotal:number ;
  //查询表单
  searchForm:FormGroup;


  constructor(private nzMessageService:NzMessageService,private fb: FormBuilder,private userService:UserService) {

  }


ngOnInit(): void {
  this.modalFrom = this.fb.group({
    userName:['',[Validators.required]],
    age:['',[Validators.required]],
    password:['',[Validators.required]],
    confirm:['',[this.confirmValidator]],
    gender:['',[Validators.required]],
    //validators:[Validators.required], asyncValidators:[this.accountAsyncValidator]} 变更默认值改变校验， 设置失去焦点 才进行访问api
    account:['',{updateOn:'blur', validators:[Validators.required], asyncValidators:[this.accountAsyncValidator]}],
    address:['',[Validators.required]]
  });

  this.searchForm = this.fb.group({
    userName:[''],
    account:[''],
    age:['']
  })
}

/**
 * 表格查询参数改变 调用
 * @param params
 */
onQueryParamsChange(params:NzTableQueryParams):void{
  const { pageIndex, pageSize } = params;
  this.loadTableData(pageIndex,pageSize);
}

/**
 * 加载表格数据
 * @param pageIndex 页数
 * @param pageSize  每页数据
 */
loadTableData(pageIndex: number, pageSize: number,account='',userName='',age='') {
  this.loading = true;
  this.userService.getUsersInfo(pageIndex,pageSize,account,userName,age).subscribe(result =>{
    this.loading = false;
    this.listOfData = result.data;
    this.pageTotal = result.total;
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
   submitForm(user: User): void {
    this.userService.insertOne(user).subscribe(res=>{
      if(res){
        this.loadTableData(this.pageIndex,this.pageSize);
        this.modalFrom.reset();
        this.visible = false;
      }
    });
  }


  submitSearchForm(user:User) : void{
    this.loadTableData(this.pageIndex,this.pageSize,user.account,user.userName,user.age.toString());
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
    this.userService.updateUser(this.editCache[id].data).subscribe(res =>{
      Object.assign(this.listOfData[index], this.editCache[id].data);
      this.editCache[id].edit = false;
      this.nzMessageService.info(res.message);
    },(err => {
      console.log("捕获错误",err);
      this.editCache[id].edit = false;
      this.nzMessageService.error('修改失败！');
      })
    );

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
    this.userService.deleteUserById(id).subscribe(res =>{
      if(res){
        this.listOfData = this.listOfData.filter(d => d.id !== id);
        if(this.setOfCheckedId.has(id)){
          this.setOfCheckedId.delete(id);
        }
        this.nzMessageService.info("删除成功！");

      }
    });
  }





  /**
   * 校验账户名
   */
  accountAsyncValidator = (control:FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      timer(1000).subscribe(()=>{
        this.userService.checkAccount(control.value).subscribe(res =>{
          if(res>0){
            observer.next({ error: true, duplicated: true });
          }else{
            observer.next(null);
          }
          observer.complete();
      })
      })
  });




  /**
   * 重复校验密码
   */
  confirmValidator = (control :FormControl): {[s:string]:boolean} =>{
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.modalFrom.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }
  /**
   * 密码改变 更新校验
   * 该配置项会决定控件如何传播变更并发出事件
   */
  validateConfirmPassword(): void {
    timer(2000).subscribe(() => this.modalFrom.controls.confirm.updateValueAndValidity());

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
