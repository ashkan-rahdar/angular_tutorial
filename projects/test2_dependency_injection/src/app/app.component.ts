import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [FormsModule, TodoListComponent, NgIf]
})
export class AppComponent {
  username: string ="";
  validname: boolean = this.username=="" ? false : true;
  greeting : boolean = false;

  confirm_name(){
    this.validname = this.username=="" ? false : true;
    if (this.username.trim()){
      this.greeting = true;
    }
  }
}
