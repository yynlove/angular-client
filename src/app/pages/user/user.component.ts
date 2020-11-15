import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
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

  constructor(private nzMessageService:NzMessageService) { }


  listOfSelection = [
    {
      text: '选择所有行',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: '选择奇数行',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: '选择偶数行',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];


  editCache: { [key: number]: { edit: boolean; data: ItemData } } = {};

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
    this.listOfData = new Array(200).fill(0).map((_, index) => {
      return {
        id: index,
        name: `Edward King ${index}`,
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
