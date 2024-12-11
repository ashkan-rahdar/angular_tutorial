import { Component } from '@angular/core';
import { TooltipDirective } from './direcives/tooltip.directive';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TooltipDirective,FormsModule,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tooltipText : string = "";
  isSet : boolean=false;
  newMessageSetting(){
    this.isSet = true;
  }
}
