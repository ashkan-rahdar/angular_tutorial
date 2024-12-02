# **Semi-Project: Task Manager**
## Objective:
Create a task manager where:
- Tasks are added using a form.
- A service manages the list of tasks.
- Components interact with the service to display and manipulate tasks.

### **Task Service**
```typescript
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: string[] = [];

  addTask(task: string) {
    this.tasks.push(task);
  }

  getTasks(): string[] {
    return this.tasks;
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
```

### **Task Component**
```typescript
@Component({
  selector: 'app-task',
  template: `
    <input #taskInput placeholder="Add a task">
    <button (click)="addTask(taskInput.value)">Add Task</button>
    <ul>
      <li *ngFor="let task of tasks; let i = index">
        {{ task }}
        <button (click)="removeTask(i)">Remove</button>
      </li>
    </ul>
  `,
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  tasks: string[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  addTask(task: string) {
    if (task.trim()) {
      this.taskService.addTask(task);
      this.tasks = this.taskService.getTasks();
    }
  }

  removeTask(index: number) {
    this.taskService.removeTask(index);
    this.tasks = this.taskService.getTasks();
  }
}
```

### **Styling (`task.component.css`)**
```css
input {
  margin-right: 10px;
  padding: 5px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
}
```
