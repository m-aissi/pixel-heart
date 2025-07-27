import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.css'],
  imports: [CommonModule]
})
export class HeartComponent {
  hp = 100;
  isSlayed = false;
  message = '';
  messages = [
    "Tu es plus fort que tu ne le crois.",
    "Chaque clic te rapproche de la lumière.",
    "Ton cœur est tombé… mais pas ton esprit.",
    "Recommence. Encore. Et encore.",
    "L’échec n’est qu’un passage. Pas une fin."
  ];

  @ViewChild('heartSvg', { static: true }) heartSvg!: ElementRef<SVGElement>;
  @ViewChild('slashRect', { static: true }) slashRect!: ElementRef<SVGRectElement>;

  constructor(private renderer: Renderer2) {}

  onClick(): void {
    if (this.isSlayed) return;

    // Effet slash
    this.renderer.addClass(this.slashRect.nativeElement, 'active');

    // Enlève la classe après fin animation (300ms)
    setTimeout(() => {
      this.renderer.removeClass(this.slashRect.nativeElement, 'active');
    }, 300);

    // Effet hit shake sur le SVG principal (comme avant)
    this.renderer.addClass(this.heartSvg.nativeElement, 'hit');
    setTimeout(() => {
      this.renderer.removeClass(this.heartSvg.nativeElement, 'hit');
    }, 200);

    this.hp = Math.max(0, this.hp - 10);

    if (this.hp === 0) {
      this.isSlayed = true;
      this.message = this.messages[Math.floor(Math.random() * this.messages.length)];
    }
  }
}
