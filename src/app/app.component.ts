import { Component } from '@angular/core';
import { HeartComponent } from './heart/heart.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [HeartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pixel-heart';
}
