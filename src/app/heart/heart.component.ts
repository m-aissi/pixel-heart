// heart.component.ts - Version avec animation slay Undertale authentique

import { Component, Renderer2, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.css'],
  imports: [CommonModule]
})
export class HeartComponent implements OnInit {
  isPlaying = false;
@ViewChild('bgmAudio', { static: true }) bgmAudio!: ElementRef<HTMLAudioElement>;

ngOnInit(): void {
  this.setupAudio();
}

private setupAudio(): void {
  const audio = this.bgmAudio.nativeElement;
  audio.volume = 0.2; // Volume discret à 20%
  
  audio.addEventListener('ended', () => {
    this.isPlaying = false;
  });
}

toggleMusic(): void {
  const audio = this.bgmAudio.nativeElement;
  
  if (this.isPlaying) {
    audio.pause();
    this.isPlaying = false;
  } else {
    audio.play().then(() => {
      this.isPlaying = true;
    }).catch((error) => {
      console.error('Erreur lecture audio:', error);
    });
  }
}
  hp = 199;
  maxHp = 199;
  isSlayed = false;
  showVictoryModal = false;
  currentMessage = '';
  
  messages = [
    "Ihih trop slay !! T'as slay le coeur, maintenant tu n'as plus qu'à slay ton entretiens demain. Je crois en toi ! Et puis regardless de l'outcome tu as gagné ceci : clique ici !! (en esperant que ça te vas comme recompense pour avoir oser y aller)"
  ];

  @ViewChild('heartSvg', { static: true }) heartSvg!: ElementRef<SVGElement>;
  @ViewChild('slashRect', { static: true }) slashRect!: ElementRef<SVGRectElement>;
  @ViewChild('heartContainer', { static: true }) heartContainer!: ElementRef<HTMLDivElement>;

  constructor(private renderer: Renderer2) {}

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
    let hpLost = Math.floor(Math.random() * 17) + 3;
    this.hp = Math.max(0, this.hp - hpLost);

    if (this.hp === 0) {
      this.triggerUndertaleSlayAnimation();
    }
  }

  private triggerUndertaleSlayAnimation(): void {
    this.isSlayed = true;
    
    // Supprime les autres animations
    this.renderer.removeClass(this.heartSvg.nativeElement, 'floating');
    this.renderer.removeClass(this.heartSvg.nativeElement, 'damage');
    this.renderer.removeClass(this.heartSvg.nativeElement, 'damage-intense');
    
    // Applique l'animation slay Undertale
    this.renderer.addClass(this.heartSvg.nativeElement, 'slayed');
    
    // Crée les particules de poussière
    this.createDustParticles();
    
    this.currentMessage = this.getRandomMessage();
    
    // Affiche la modale après l'animation
    setTimeout(() => {
      this.showVictoryModal = true;
    }, 1200); // Durée de l'animation slay
  }
  openImage(): void {
    const url = 'https://media.discordapp.net/attachments/776543561776365578/1399112593133670431/Untitled-1.png?ex=6887d0a4&is=68867f24&hm=a4ba0521b5a3ebe97a18b6f4dd7990eb73b2ec4ce676fc400110cccd4e2adb5d&=&format=webp&quality=lossless&width=1132&height=968';
    window.open(url, '_blank');
  }
  private createDustParticles(): void {
    const container = this.heartContainer.nativeElement;
    const heartRect = this.heartSvg.nativeElement.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Crée 8 particules de poussière
    for (let i = 0; i < 8; i++) {
      const particle = this.renderer.createElement('div');
      this.renderer.addClass(particle, 'dust-particle');
      
      // Position aléatoire autour du cœur
      const randomX = Math.random() * 100 - 50; // -50px à +50px
      const randomY = Math.random() * 100 - 50; // -50px à +50px
      
      this.renderer.setStyle(particle, 'position', 'absolute');
      this.renderer.setStyle(particle, 'left', `calc(50% + ${randomX}px)`);
      this.renderer.setStyle(particle, 'top', `calc(50% + ${randomY}px)`);
      this.renderer.setStyle(particle, 'width', `${Math.random() * 3 + 1}px`);
      this.renderer.setStyle(particle, 'height', `${Math.random() * 3 + 1}px`);
      this.renderer.setStyle(particle, 'background-color', '#666');
      this.renderer.setStyle(particle, 'border-radius', '50%');
      this.renderer.setStyle(particle, 'pointer-events', 'none');
      this.renderer.setStyle(particle, 'z-index', '10');
      
      // Délai aléatoire pour chaque particule
      setTimeout(() => {
        this.renderer.addClass(particle, 'active');
      }, Math.random() * 300);
      
      this.renderer.appendChild(container, particle);
      
      // Supprime la particule après l'animation
      setTimeout(() => {
        if (container.contains(particle)) {
          this.renderer.removeChild(container, particle);
        }
      }, 1500);
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
    
    // Réactive l'animation floating
    setTimeout(() => {
      this.renderer.removeClass(this.heartSvg.nativeElement, 'slayed');
      this.renderer.addClass(this.heartSvg.nativeElement, 'floating');
    }, 100);
  }

  get hpPercentage(): number {
    return (this.hp / this.maxHp) * 100;
  }
}