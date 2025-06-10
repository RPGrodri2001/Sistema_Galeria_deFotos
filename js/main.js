class ElegantCarousel {
    constructor() {
        console.log('🚀 ===== CARRUSEL ROMÁNTICO - NAVEGACIÓN CORREGIDA =====');
        
        this.currentIndex = 0;
        this.totalSlides = 10;
        this.isPlaying = false;
        this.interval = null;
        this.slideInterval = 2500;
        this.fullscreenIndex = 0;
        this.wasPlayingBeforeFullscreen = false;
        
        // Elementos del DOM
        this.initializeElements();
        
        // Verificar que todo esté listo
        if (this.verifyElements()) {
            this.init();
        } else {
            console.error('❌ Error: Elementos del DOM no encontrados');
        }
    }
    
    initializeElements() {
        console.log('🔧 Inicializando elementos del DOM...');
        
        // Elementos principales
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
        
        // Elementos de pantalla completa - CON NOMBRES ÚNICOS
        this.fullscreenModal = document.getElementById('fullscreenModal');
        this.fullscreenImage = document.getElementById('fullscreenImage');
        this.fullscreenTitle = document.getElementById('fullscreenTitle');
        this.fullscreenDescription = document.getElementById('fullscreenDescription');
        this.closeBtn = document.getElementById('closeBtn');
        this.fullscreenPrevBtn = document.getElementById('fullscreenPrev'); // Nombre único
        this.fullscreenNextBtn = document.getElementById('fullscreenNext'); // Nombre único
        
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
            { src: './Alli/foto10.jpeg', title: 'Mi Reina', description: 'Eres la reina de mi corazón 👑' },
            { src: './Alli/foto11.jpeg', title: 'Mi cuchi', description: 'Eres la reina de mi corazón 👑' },
            { src: './Alli/foto12.jpeg', title: 'Mi niña', description: 'Eres la reina de mi corazón 👑' }
        ];
        
        console.log('✅ Elementos inicializados');
    }
    
    verifyElements() {
        console.log('🔍 Verificando elementos del DOM...');
        const checks = {
            'Slides': this.slides.length === 10,
            'Modal Fullscreen': !!this.fullscreenModal,
            'Imagen Fullscreen': !!this.fullscreenImage,
            'Botón Cerrar': !!this.closeBtn,
            'Botón Prev Fullscreen': !!this.fullscreenPrevBtn,
            'Botón Next Fullscreen': !!this.fullscreenNextBtn
        };
        
        let allGood = true;
        Object.entries(checks).forEach(([name, status]) => {
            console.log(`${status ? '✅' : '❌'} ${name}: ${status ? 'OK' : 'ERROR'}`);
            if (!status) allGood = false;
        });
        
        return allGood;
    }
    
    init() {
        console.log('🚀 Inicializando carrusel...');
        try {
            this.createIndicators();
            this.createParticles();
            this.bindEvents();
            this.addImageClickHandlers();
            this.updateDisplay();
            console.log('✅ Carrusel inicializado exitosamente');
        } catch (error) {
            console.error('❌ Error en inicialización:', error);
        }
    }
    
    // ===== CREACIÓN DE ELEMENTOS =====
    
    createIndicators() {
        if (!this.indicators) return;
        
        this.indicators.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicators.appendChild(indicator);
        }
        console.log('📍 Indicadores creados');
    }
    
    createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        setInterval(() => {
            if (Math.random() < 0.3) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
                particle.style.animationDelay = Math.random() * 2 + 's';
                
                particlesContainer.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 7000);
            }
        }, 200);
        console.log('✨ Sistema de partículas activado');
    }
    
    // ===== FUNCIONALIDAD DE PANTALLA COMPLETA =====
    
    addImageClickHandlers() {
        console.log('🖱️ Configurando handlers de click...');
        
        this.slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img) {
                const clickHandler = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`🔥 CLICK DETECTADO en imagen ${index + 1}`);
                    this.openFullscreen(index);
                };
                
                img.addEventListener('click', clickHandler);
                slide.addEventListener('click', clickHandler);
                
                console.log(`✅ Handler configurado para imagen ${index + 1}`);
            }
        });
        
        console.log('🎯 Todos los handlers configurados');
    }
    
    openFullscreen(index = null) {
        console.log('🖼️ ===== ABRIENDO PANTALLA COMPLETA =====');
        
        if (!this.fullscreenModal || !this.fullscreenImage) {
            console.error('❌ Elementos de pantalla completa no disponibles');
            return;
        }
        
        const targetIndex = index !== null ? index : this.currentIndex;
        const photo = this.photoData[targetIndex];
        
        console.log(`📸 Cargando imagen ${targetIndex + 1}: ${photo.title}`);
        
        // Pausar slideshow
        this.wasPlayingBeforeFullscreen = this.isPlaying;
        if (this.isPlaying) {
            this.pause();
        }
        
        // Configurar imagen
        this.fullscreenImage.src = photo.src;
        this.fullscreenImage.alt = `Foto ${targetIndex + 1}`;
        
        if (this.fullscreenTitle) this.fullscreenTitle.textContent = photo.title;
        if (this.fullscreenDescription) this.fullscreenDescription.textContent = photo.description;
        
        this.fullscreenIndex = targetIndex;
        
        // Mostrar modal
        this.fullscreenModal.style.display = 'flex';
        this.fullscreenModal.style.opacity = '0';
        
        requestAnimationFrame(() => {
            this.fullscreenModal.classList.add('show');
            this.fullscreenModal.style.opacity = '1';
        });
        
        document.body.style.overflow = 'hidden';
        
        console.log('✅ Pantalla completa ACTIVADA');
    }
    
    closeFullscreen() {
        console.log('❌ ===== CERRANDO PANTALLA COMPLETA =====');
        
        if (!this.fullscreenModal) return;
        
        this.fullscreenModal.classList.remove('show');
        this.fullscreenModal.style.opacity = '0';
        
        setTimeout(() => {
            this.fullscreenModal.style.display = 'none';
        }, 300);
        
        document.body.style.overflow = 'auto';
        
        if (this.wasPlayingBeforeFullscreen) {
            this.play();
        }
        
        console.log('✅ Pantalla completa CERRADA');
    }
    
    // ===== NAVEGACIÓN CORREGIDA =====
    
    goToNextFullscreenImage() {
        console.log('➡️ ===== SIGUIENTE IMAGEN (BOTÓN DERECHA) =====');
        const oldIndex = this.fullscreenIndex;
        this.fullscreenIndex = (this.fullscreenIndex + 1) % this.totalSlides;
        console.log(`📍 Navegando: ${oldIndex + 1} → ${this.fullscreenIndex + 1}`);
        this.updateFullscreenImage();
    }
    
    goToPrevFullscreenImage() {
        console.log('⬅️ ===== IMAGEN ANTERIOR (BOTÓN IZQUIERDA) =====');
        const oldIndex = this.fullscreenIndex;
        this.fullscreenIndex = (this.fullscreenIndex - 1 + this.totalSlides) % this.totalSlides;
        console.log(`📍 Navegando: ${oldIndex + 1} → ${this.fullscreenIndex + 1}`);
        this.updateFullscreenImage();
    }
    
    updateFullscreenImage() {
        if (!this.fullscreenImage) return;
        
        const photo = this.photoData[this.fullscreenIndex];
        console.log(`🔄 Actualizando imagen a: ${photo.title}`);
        
        // Transición suave
        this.fullscreenImage.style.opacity = '0';
        this.fullscreenImage.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.fullscreenImage.src = photo.src;
            this.fullscreenImage.alt = `Foto ${this.fullscreenIndex + 1}`;
            
            if (this.fullscreenTitle) this.fullscreenTitle.textContent = photo.title;
            if (this.fullscreenDescription) this.fullscreenDescription.textContent = photo.description;
            
            this.fullscreenImage.style.opacity = '1';
            this.fullscreenImage.style.transform = 'scale(1)';
            
            console.log('✅ Imagen actualizada exitosamente');
        }, 200);
    }
    
    // ===== EVENTOS COMPLETAMENTE CORREGIDOS =====
    
    bindEvents() {
        console.log('🔧 Configurando eventos...');
        
        // Eventos básicos
        this.bindBasicEvents();
        
        // Eventos de pantalla completa CORREGIDOS
        this.bindFullscreenEventsFixed();
        
        // Navegación con teclado
        this.bindKeyboardEvents();
        
        // Soporte táctil
        this.bindTouchEvents();
        
        console.log('✅ Todos los eventos configurados correctamente');
    }
    
    bindBasicEvents() {
        if (this.playBtn) this.playBtn.addEventListener('click', () => this.togglePlay());
        if (this.resetBtn) this.resetBtn.addEventListener('click', () => this.reset());
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previousSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
        if (this.prevControlBtn) this.prevControlBtn.addEventListener('click', () => this.previousSlide());
        if (this.nextControlBtn) this.nextControlBtn.addEventListener('click', () => this.nextSlide());
        if (this.expandBtn) this.expandBtn.addEventListener('click', () => this.openFullscreen());
        
        console.log('🎮 Eventos básicos configurados');
    }
    
    bindFullscreenEventsFixed() {
        console.log('🔧 Configurando eventos de pantalla completa CORREGIDOS...');
        
        // Botón CERRAR
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🖱️ CLICK en botón CERRAR');
                this.closeFullscreen();
            });
            console.log('✅ Botón CERRAR configurado');
        }
        
        // Botón ANTERIOR (IZQUIERDA) ←
        if (this.fullscreenPrevBtn) {
            this.fullscreenPrevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🖱️ CLICK en botón IZQUIERDA ← - Imagen anterior');
                this.goToPrevFullscreenImage();
            });
            console.log('✅ Botón IZQUIERDA ← configurado');
        } else {
            console.error('❌ Botón IZQUIERDA no encontrado');
        }
        
        // Botón SIGUIENTE (DERECHA) → - CORREGIDO
        if (this.fullscreenNextBtn) {
            this.fullscreenNextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🖱️ CLICK en botón DERECHA → - Imagen siguiente');
                this.goToNextFullscreenImage();
            });
            console.log('✅ Botón DERECHA → configurado CORRECTAMENTE');
        } else {
            console.error('❌ Botón DERECHA no encontrado');
        }
        
        // Click en fondo para cerrar
        if (this.fullscreenModal) {
            this.fullscreenModal.addEventListener('click', (e) => {
                if (e.target === this.fullscreenModal) {
                    console.log('🖱️ Click en FONDO - Cerrando');
                    this.closeFullscreen();
                }
            });
        }
        
        console.log('🎯 Eventos de pantalla completa configurados CORRECTAMENTE');
    }
    
    bindKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            const isFullscreen = this.fullscreenModal && this.fullscreenModal.classList.contains('show');
            
            if (!isFullscreen) {
                // Navegación normal
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
                        console.log('⌨️ Flecha IZQUIERDA ← - Imagen anterior');
                        this.goToPrevFullscreenImage();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        console.log('⌨️ Flecha DERECHA → - Imagen siguiente');
                        this.goToNextFullscreenImage();
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
        console.log('⌨️ Navegación con teclado configurada');
    }
    
    bindTouchEvents() {
        if (!this.fullscreenModal) return;
        
        let startX = 0;
        
        this.fullscreenModal.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.fullscreenModal.addEventListener('touchend', (e) => {
            if (!this.fullscreenModal.classList.contains('show')) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    console.log('📱 SWIPE izquierda - Siguiente imagen');
                    this.goToNextFullscreenImage();
                } else {
                    console.log('📱 SWIPE derecha - Imagen anterior');
                    this.goToPrevFullscreenImage();
                }
            }
        });
        console.log('📱 Soporte táctil configurado');
    }
    
    // ===== FUNCIONES DEL CARRUSEL NORMAL =====
    
    updateDisplay() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentIndex);
        });
        
        if (this.indicators) {
            const indicatorElements = this.indicators.querySelectorAll('.indicator');
            indicatorElements.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        }
        
        if (this.counter) {
            this.counter.textContent = `${this.currentIndex + 1} / ${this.totalSlides}`;
        }
        
        if (this.progressBar) {
            const progress = ((this.currentIndex + 1) / this.totalSlides) * 100;
            this.progressBar.style.width = `${progress}%`;
        }
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
        
        if (this.playBtn) {
            this.playBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
            this.playBtn.classList.add('playing');
        }
    }
    
    pause() {
        this.isPlaying = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        
        if (this.playBtn) {
            this.playBtn.innerHTML = '<i class="fas fa-play"></i> Continuar';
            this.playBtn.classList.remove('playing');
        }
    }
    
    reset() {
        this.pause();
        this.currentIndex = 0;
        this.updateDisplay();
        if (this.playBtn) {
            this.playBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar Presentación';
            this.playBtn.classList.remove('playing');
        }
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 ===== CARRUSEL CON NAVEGACIÓN CORREGIDA =====');
    
    setTimeout(() => {
        try {
            window.carousel = new ElegantCarousel();
            console.log('🎉 ¡Carrusel iniciado exitosamente!');
            
            setTimeout(() => {
                console.log('💡 ===== PRUEBA DE NAVEGACIÓN =====');
                console.log('🖱️ Haz click en una imagen para probar');
                console.log('⌨️ Usa las flechas ← → para navegar');
                console.log('======================================');
            }, 1000);
            
        } catch (error) {
            console.error('❌ Error:', error);
        }
    }, 100);
});