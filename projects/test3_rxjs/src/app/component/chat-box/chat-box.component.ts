import { Component } from '@angular/core';
import { MessageInputComponent } from "../message-input/message-input.component";
import { ChatService } from '../../service/chat.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [MessageInputComponent, NgFor],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {
  messages: string[] = [];

  constructor(private chatService: ChatService) {
    this.chatService.histories$.subscribe(history => (this.messages = history));
  }
}
