import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  constructor(){console.log("bi madar");}
  tasks: string[] = [];

  addTask(newTask: string, IsAny: boolean){
    if (newTask.trim()){
      this.tasks.push(newTask);
      newTask = '';
      IsAny = true;
      console.log(this.tasks);
    }
  }

  removeTask(index : number, IsAny: boolean){
    this.tasks.splice(index, 1);
    IsAny = this.tasks.length==0 ? false : true;
  }
}
