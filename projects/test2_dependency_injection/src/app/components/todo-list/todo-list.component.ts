import { NgFor, NgIf } from '@angular/common';
import { Component, Input, input} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  tasks: string[] = [];
  newTask : string = '';
  @Input() username:string = 'username';

  IsAny: boolean = this.tasks.length==0 ? false : true;

  addTask(){
    if (this.newTask.trim()){
      this.tasks.push(this.newTask);
      this.newTask = '';
      this.IsAny = true;
    }
  }

  removeTask(index : number){
    this.tasks.splice(index, 1);
    this.IsAny = this.tasks.length==0 ? false : true;
  }
}
