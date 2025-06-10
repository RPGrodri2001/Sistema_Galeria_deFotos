class ElegantCarousel {
    constructor() {
        this.currentIndex = 0;
        this.totalSlides = 10;
        this.isPlaying = false;
        this.interval = null;
        this.slideInterval = 2500; // 2,5 segundos
        this.fullscreenIndex = 0;
        this.wasPlayingBeforeFullscreen = false;
        
        // Elementos del DOM
        this.slides = document.querySelectorAll('.slide');
        this.playBtn = document.getElementById('playBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.prevControlBtn = document.getElementById('prevControlBtn');
        this.nextControlBtn = document.getElementById('nextControlBtn');
        this.expandBtn = document.getElementById('expandBtn');
        this.counter = document.getElementById('counter');
        this.progressBar = document.getElementById('progressBar');
        this.indicators = document.getElementById('indicators');
        
        // Elementos de pantalla completa
        this.fullscreenModal = document.getElementById('fullscreenModal');
        this.fullscreenImage = document.getElementById('fullscreenImage');
        this.fullscreenTitle = document.getElementById('fullscreenTitle');
        this.fullscreenDescription = document.getElementById('fullscreenDescription');
        this.closeBtn = document.getElementById('closeBtn');
        this.fullscreenPrev = document.getElementById('fullscreenPrev');
        this.fullscreenNext = document.getElementById('fullscreenNext');
        
        // Datos de las fotos
        this.photoData = [
            { src: './Alli/foto1.jpeg', title: 'Nuestro Primer Momento', description: 'Donde todo comenzó ❤️' },
            { src: './Alli/foto2.jpeg', title: 'Sonrisas Compartidas', description: 'Tu sonrisa ilumina mi día ✨' },
            { src: './Alli/foto3.jpeg', title: 'Amor Verdadero', description: 'Cada momento contigo es perfecto 💕' },
            { src: './Alli/foto4.jpeg', title: 'Aventuras Juntos', description: 'Explorando el mundo de tu mano 🌟' },
            { src: './Alli/foto5.jpeg', title: 'Días de Sol', description: 'Contigo todo es más brillante ☀️' },
            { src: './Alli/foto6.jpeg', title: 'Noches Mágicas', description: 'Bajo las estrellas contigo 🌙' },
            { src: './Alli/foto7.jpeg', title: 'Regalos del Corazón', description: 'Eres el mejor regalo de mi vida 🎁' },
            { src: './Alli/foto8.jpeg', title: 'Promesas Eternas', description: 'Mi corazón es tuyo para siempre 💍' },
            { src: './Alli/foto9.jpeg', title: 'Amor Infinito', description: 'Nuestro amor no tiene límites ∞' },
            { src: './Alli/foto10.jpeg', title: 'Mi Reina', description: 'Eres la reina de mi corazón 👑' }
        ];
        
        this.init();
    }
    
    init() {
        this.createIndicators();
        this.createParticles();
        this.bindEvents();
        this.addImageClickHandlers();
        this.updateDisplay();
    }
    
    // ===== CREACIÓN DE ELEMENTOS =====
    
    createIndicators() {
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicators.appendChild(indicator);
        }
    }
    
    createParticles() {
        const particlesContainer = document.getElementById('particles');
        
        setInterval(() => {
            if (Math.random() < 0.3) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
                particle.style.animationDelay = Math.random() * 2 + 's';
                
                particlesContainer.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 7000);
            }
        }, 200);
    }
    
    // ===== FUNCIONALIDAD DE PANTALLA COMPLETA =====
    
    addImageClickHandlers() {
        this.slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img) {
                // Click en imagen para abrir pantalla completa
                img.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openFullscreen(index);
                });
                
                // Doble click también funciona
                img.addEventListener('dblclick', (e) => {
                    e.preventDefault();
                    this.openFullscreen(index);
                });
            }
        });
    }
    
    openFullscreen(index = null) {
        const targetIndex = index !== null ? index : this.currentIndex;
        const photo = this.photoData[targetIndex];
        
        // Pausar slideshow si está reproduciéndose
        this.wasPlayingBeforeFullscreen = this.isPlaying;
        if (this.isPlaying) {
            this.pause();
        }
        
        // Configurar la imagen en pantalla completa
        this.fullscreenImage.src = photo.src;
        this.fullscreenImage.alt = `Foto ${targetIndex + 1}`;
        this.fullscreenTitle.textContent = photo.title;
        this.fullscreenDescription.textContent = photo.description;
        
        this.fullscreenIndex = targetIndex;
        
        // Mostrar modal con animación
        this.fullscreenModal.style.display = 'flex';
        setTimeout(() => {
            this.fullscreenModal.classList.add('show');
        }, 10);
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }
    
    closeFullscreen() {
        this.fullscreenModal.classList.remove('show');
        
        setTimeout(() => {
            this.fullscreenModal.style.display = 'none';
        }, 300);
        
        // Restaurar scroll del body
        document.body.style.overflow = 'auto';
        
        // Reanudar slideshow si estaba reproduciéndose
        if (this.wasPlayingBeforeFullscreen) {
            this.play();
        }
    }
    
    fullscreenNext() {
        this.fullscreenIndex = (this.fullscreenIndex + 1) % this.totalSlides;
        this.updateFullscreenImage();
    }
    
    fullscreenPrevious() {
        this.fullscreenIndex = (this.fullscreenIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateFullscreenImage();
    }
    
    updateFullscreenImage() {
        const photo = this.photoData[this.fullscreenIndex];
        
        // Animación de transición suave
        this.fullscreenImage.style.opacity = '0';
        this.fullscreenImage.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.fullscreenImage.src = photo.src;
            this.fullscreenImage.alt = `Foto ${this.fullscreenIndex + 1}`;
            this.fullscreenTitle.textContent = photo.title;
            this.fullscreenDescription.textContent = photo.description;
            
            // Restaurar opacidad y escala
            this.fullscreenImage.style.opacity = '1';
            this.fullscreenImage.style.transform = 'scale(1)';
        }, 200);
    }
    
    // ===== EVENTOS Y NAVEGACIÓN =====
    
    bindEvents() {
        // Eventos del carrusel normal
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.prevControlBtn.addEventListener('click', () => this.previousSlide());
        this.nextControlBtn.addEventListener('click', () => this.nextSlide());
        this.expandBtn.addEventListener('click', () => this.openFullscreen());
        
        // Eventos de pantalla completa
        this.closeBtn.addEventListener('click', () => this.closeFullscreen());
        this.fullscreenPrev.addEventListener('click', () => this.fullscreenPrevious());
        this.fullscreenNext.addEventListener('click', () => this.fullscreenNext());
        
        // Cerrar fullscreen al hacer click en el fondo
        this.fullscreenModal.addEventListener('click', (e) => {
            if (e.target === this.fullscreenModal) {
                this.closeFullscreen();
            }
        });
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (!this.fullscreenModal.classList.contains('show')) {
                // Navegación normal del carrusel
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.previousSlide();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextSlide();
                        break;
                    case ' ':
                        e.preventDefault();
                        this.togglePlay();
                        break;
                    case 'Enter':
                    case 'f':
                    case 'F':
                        e.preventDefault();
                        this.openFullscreen();
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.reset();
                        break;
                }
            } else {
                // Navegación en pantalla completa
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.fullscreenPrevious();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.fullscreenNext();
                        break;
                    case 'Escape':
                    case 'q':
                    case 'Q':
                        e.preventDefault();
                        this.closeFullscreen();
                        break;
                }
            }
        });
        
        // Soporte para gestos en móviles
        this.addTouchSupport();
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        
        this.fullscreenModal.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.fullscreenModal.addEventListener('touchend', (e) => {
            if (!this.fullscreenModal.classList.contains('show')) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Solo si el swipe es más horizontal que vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next image
                    this.fullscreenNext();
                } else {
                    // Swipe right - previous image
                    this.fullscreenPrevious();
                }
            }
        });
    }
    
    // ===== FUNCIONES DEL CARRUSEL NORMAL =====
    
    updateDisplay() {
        // Actualizar slides
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentIndex);
        });
        
        // Actualizar indicadores
        const indicatorElements = this.indicators.querySelectorAll('.indicator');
        indicatorElements.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // Actualizar contador
        this.counter.textContent = `${this.currentIndex + 1} / ${this.totalSlides}`;
        
        // Actualizar barra de progreso
        const progress = ((this.currentIndex + 1) / this.totalSlides) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateDisplay();
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateDisplay();
    }
    
    previousSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateDisplay();
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        this.isPlaying = true;
        this.interval = setInterval(() => {
            this.nextSlide();
        }, this.slideInterval);
        
        this.playBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
        this.playBtn.classList.add('playing');
    }
    
    pause() {
        this.isPlaying = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        
        this.playBtn.innerHTML = '<i class="fas fa-play"></i> Continuar';
        this.playBtn.classList.remove('playing');
    }
    
    reset() {
        this.pause();
        this.currentIndex = 0;
        this.updateDisplay();
        this.playBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar Presentación';
        this.playBtn.classList.remove('playing');
    }
}

// Inicializar el carrusel cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new ElegantCarousel();
    
    // Mostrar mensaje de ayuda en consola
    setTimeout(() => {
        console.log('💡 Tip: Haz clic en cualquier imagen para verla en pantalla completa');
        console.log('⌨️ Controles:');
        console.log('   • Clic en imagen → Pantalla completa');
        console.log('   • Enter/F → Pantalla completa');
        console.log('   • Escape/Q → Cerrar pantalla completa');
        console.log('   • Flechas → Navegar');
        console.log('   • Espacio → Play/Pausa');
        console.log('📱 Móvil: Desliza izquierda/derecha en pantalla completa');
    }, 1000);
});