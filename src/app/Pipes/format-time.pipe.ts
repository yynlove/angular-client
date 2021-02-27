import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'formatTime'
})
class formatTime implements PipeTransform{

  transform(time: any) {
      return time;
  }

}
