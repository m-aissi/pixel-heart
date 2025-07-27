// heart.component.ts - Version upgradée

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
  maxHp = 100;
  isSlayed = false;
  showVictoryModal = false;
  currentMessage = '';
  
  messages = [
    "Tu as vaincu ce cœur... maintenant vaincs ta journée 💪"
  ];

  @ViewChild('heartSvg', { static: true }) heartSvg!: ElementRef<SVGElement>;
  @ViewChild('slashRect', { static: true }) slashRect!: ElementRef<SVGRectElement>;

  constructor(private renderer: Renderer2) {}


// FONCTION BONUS : Pour variation d'intensité selon les HP
onClick(): void {
  if (this.isSlayed) return;

  // Effet slash
  this.renderer.addClass(this.slashRect.nativeElement, 'active');
  setTimeout(() => {
    this.renderer.removeClass(this.slashRect.nativeElement, 'active');
  }, 300);

  // Animation de dégâts variable selon les HP restants
  const damageClass = this.hp <= 30 ? 'damage-intense' : 'damage';
  const animationDuration = this.hp <= 30 ? 800 : 600;
  
  this.renderer.addClass(this.heartSvg.nativeElement, damageClass);
  
  setTimeout(() => {
    this.renderer.removeClass(this.heartSvg.nativeElement, damageClass);
  }, animationDuration);

  this.hp = Math.max(0, this.hp - 10);

  if (this.hp === 0) {
    this.isSlayed = true;
    this.currentMessage = this.getRandomMessage();
    
    setTimeout(() => {
      this.showVictoryModal = true;
    }, 1000);
  }
}

  private getRandomMessage(): string {
    return this.messages[Math.floor(Math.random() * this.messages.length)];
  }

  resetGame(): void {
    this.hp = 100;
    this.isSlayed = false;
    this.showVictoryModal = false;
    this.currentMessage = '';
  }

  get hpPercentage(): number {
    return (this.hp / this.maxHp) * 100;
  }
}