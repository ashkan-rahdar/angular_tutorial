import { NgFor, NgIf } from '@angular/common';
import { Component, Input, input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskManagerService } from '../../services/task-manager.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  constructor(private taskService: TaskManagerService) {}
  @Input() username:string = 'username';
  tasks = this.taskService.tasks;

  IsAny: boolean = this.taskService.tasks.length==0 ? false : true;
  newTask : string = '';

  addTask(){
    this.taskService.addTask(this.newTask, this.IsAny);
    this.tasks = this.taskService.tasks;
    console.log(this.newTask)
  }

  removeTask(index : number){
    this.taskService.removeTask(index,this.IsAny);
    this.tasks = this.taskService.tasks;
  }
}
