# **Semi-Project: To-Do List Application**
## **Objective:**
Build a simple to-do list app to practice components and templates.

### **Steps:**
1. **Create the Main Component**:
   - Use `ng g c todo-list`.
   - Define a `tasks` array to hold the list items.
   - Implement methods to add and remove tasks.

2. **Define the Template**:
   - Use an `*ngFor` directive to loop through the `tasks` array.
   - Add input fields and buttons for adding tasks.

3. **Add Styling**:
   - Use CSS to make the list visually appealing.

## **Code Example**
### TypeScript File (`todo-list.component.ts`)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  tasks: string[] = [];
  newTask = '';

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push(this.newTask);
      this.newTask = '';
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
```

### Template File (`todo-list.component.html`)
```html
<div class="todo-container">
  <h1>To-Do List</h1>
  <div>
    <input [(ngModel)]="newTask" placeholder="Enter a new task">
    <button (click)="addTask()">Add Task</button>
  </div>
  <ul>
    <li *ngFor="let task of tasks; let i = index">
      {{ task }}
      <button (click)="removeTask(i)">Remove</button>
    </li>
  </ul>
</div>
```

### CSS File (`todo-list.component.css`)
```css
.todo-container {
  text-align: center;
  max-width: 400px;
  margin: auto;
}

input {
  margin-right: 10px;
  padding: 5px;
}

button {
  padding: 5px 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li button {
  padding: 2px 5px;
  color: white;
  background-color: red;
  border: none;
  border-radius: 3px;
}
```

---
**Practice Challenge:** Extend the To-Do List app to include:
- A task completion toggle (mark a task as done).
- A "Clear All" button to remove all tasks.