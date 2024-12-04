import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private history = new BehaviorSubject<string[]>([]); // Aray of messages

  histories$ = this.history.asObservable();

  addMessage(newMessage: string): void{
    this.addHistory(newMessage);
    this.answerIt(newMessage);
  }

  addHistory(newMessage: string): void {
    const updatedMessages = [newMessage, ...this.history.value];
    this.history.next(updatedMessages);
  }

  answerIt(newMessage: string): void{
    const asnwering = "consider this as an answer of: " + "( " + newMessage + " )";
    this.addHistory(asnwering);
  }

}
