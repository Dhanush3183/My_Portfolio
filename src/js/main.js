import gsap from 'gsap';
import barba from '@barba/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import './three/particles.js';
import './game/gameSystem.js';
import './video/videoGrid.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ===== Loading Screen =====
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    initAnimations();
  }, 1000);
});

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeToggle.classList.toggle('active');
});

// ===== Magnetic Buttons =====
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.3 });
  });
});

// ===== Hero Animations =====
function initAnimations() {
  // Title animation
  gsap.from('.hero-title', {
    duration: 1.5,
    opacity: 0,
    y: 100,
    ease: 'power4.out',
    delay: 0.5
  });
  
  gsap.from('.hero-description', {
    duration: 1.5,
    opacity: 0,
    y: 50,
    ease: 'power4.out',
    delay: 1
  });
  
  gsap.from('.hero-cta', {
    duration: 1.5,
    opacity: 0,
    y: 30,
    ease: 'power4.out',
    delay: 1.3
  });
  
  // Scroll indicator
  gsap.to('.scroll-indicator', {
    duration: 1.5,
    y: 10,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut',
    delay: 2
  });
}

// ===== Navigation Scroll =====
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    gsap.to(window, {
      duration: 1,
      scrollTo: target,
      ease: 'power3.inOut'
    });
  });
});

// ===== Lightbox Video Player =====
const lightbox = document.getElementById('videoLightbox');
const lightboxVideo = document.getElementById('lightboxVideo');
const closeBtn = document.querySelector('.lightbox-close');

document.addEventListener('click', (e) => {
  if (e.target.closest('.video-card')) {
    const card = e.target.closest('.video-card');
    const videoSrc = card.querySelector('video')?.src || card.dataset.video;
    if (videoSrc) {
      lightboxVideo.src = videoSrc;
      lightbox.classList.add('active');
      lightboxVideo.play();
    }
  }
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
  lightboxVideo.pause();
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    lightboxVideo.pause();
  }
});

// ===== Confetti on Level Up =====
window.triggerConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
};

// Add game link
const gameLink = document.querySelector('a[href="#game"]');
if (gameLink) {
  gameLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/game.html';
  });
}