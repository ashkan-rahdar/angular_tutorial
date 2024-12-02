# **4. Semi-Project: Chat Application**

## **Scenario**
Build a real-time chat system:
- Shared service to hold chat messages.
- Two components: `ChatBox` and `MessageInput`.

### **Service Code:**
```typescript
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<string[]>([]); // Array of messages
  messages$ = this.messagesSubject.asObservable();

  addMessage(newMessage: string): void {
    const updatedMessages = [...this.messagesSubject.value, newMessage];
    this.messagesSubject.next(updatedMessages);
  }
}
```

### **ChatBox Component:**
```typescript
@Component({
  selector: 'app-chat-box',
  template: `
    <div>
      <h3>Chat Box</h3>
      <ul>
        <li *ngFor="let message of messages">{{ message }}</li>
      </ul>
    </div>
  `,
})
export class ChatBoxComponent {
  messages: string[] = [];

  constructor(private chatService: ChatService) {
    this.chatService.messages$.subscribe(messages => (this.messages = messages));
  }
}
```

### **MessageInput Component:**
```typescript
@Component({
  selector: 'app-message-input',
  template: `
    <div>
      <input [(ngModel)]="newMessage" placeholder="Type your message">
      <button (click)="sendMessage()">Send</button>
    </div>
  `,
})
export class MessageInputComponent {
  newMessage = '';

  constructor(private chatService: ChatService) {}

  sendMessage(): void {
    this.chatService.addMessage(this.newMessage);
    this.newMessage = '';
  }
}
```
