import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HeartComponent } from './heart/heart.component';

declare var particlesJS: any;

@Component({
  selector: 'app-root',
  imports: [HeartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'pixel-heart';

  ngOnInit(): void {
    // Initialisation
  }

  ngAfterViewInit(): void {
    this.initStarField();
  }

  private initStarField(): void {
    // Chargement de la configuration des étoiles
    fetch('assets/particles-stars.json')
      .then(response => response.json())
      .then(config => {
        particlesJS('particles-js', config);
      })
      .catch(error => {
        console.error('Erreur lors du chargement de la config particles:', error);
        // Configuration de fallback
        this.fallbackStarField();
      });
  }

  private fallbackStarField(): void {
    // Configuration directe en cas d'échec du chargement du JSON
    particlesJS('particles-js', {
      particles: {
        number: { value: 150 },
        color: { value: ['#ffffff', '#ffd700', '#87ceeb'] },
        shape: { type: 'circle' },
        opacity: {
          value: 0.8,
          random: true,
          anim: { enable: true, speed: 1 }
        },
        size: {
          value: 2,
          random: true,
          anim: { enable: true, speed: 2 }
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: 'none',
          random: true
        }
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: 'bubble' },
          onclick: { enable: true, mode: 'push' }
        }
      }
    });
  }
}