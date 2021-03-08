import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'genderFormat'
})
export class genderFormatPipe implements PipeTransform{

  transform(value: any) {
      if(value == 1){
        return '男';
      }else if(value == 2){
        return '女';
      }else{
        return '';
      }

  }

}
