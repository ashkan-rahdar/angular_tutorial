import { Component } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css'
})
export class MessageInputComponent {
  newMessage = '';

  constructor(private chatService: ChatService) {}

  sendMessage(): void {
    if (this.newMessage.trim()){
      this.chatService.addMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}
