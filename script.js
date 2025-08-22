// Configuração do áudio
const audio = document.getElementById('background-music');
const playOverlay = document.getElementById('play-overlay');
const playButton = document.getElementById('play-button');
const musicControl = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');
const musicText = document.getElementById('music-text');

let isPlaying = false;

// Função para tocar a música
function playMusic() {
    audio.play().then(() => {
        isPlaying = true;
        playOverlay.style.display = 'none';
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');
        musicText.textContent = 'Apocalypse - Cigarettes After Sex';
    }).catch(error => {
        console.log('Reprodução automática impedida:', error);
        playOverlay.querySelector('p').textContent = 
            'A reprodução automática foi bloqueada. Por favor, clique para tocar a música.';
    });
}

// Função para pausar/retomar a música
function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-play');
        musicText.textContent = 'Tocar música';
    } else {
        audio.play().then(() => {
            musicIcon.classList.remove('fa-play');
            musicIcon.classList.add('fa-pause');
            musicText.textContent = 'Apocalypse - Cigarettes After Sex';
        });
    }
    isPlaying = !isPlaying;
}

// Event listeners
playButton.addEventListener('click', playMusic);
musicControl.addEventListener('click', toggleMusic);

// Configuração do slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slideCounter = document.querySelector('.slide-counter');
const totalSlides = slides.length;

// Atualiza o contador de slides
function updateSlideCounter() {
    slideCounter.textContent = `${currentSlide + 1}/${totalSlides}`;
}

// Inicia o slideshow
function startSlideshow() {
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
        updateSlideCounter();
    }, 4000);
}

// Função para calcular a diferença entre datas de forma precisa - CORRIGIDA
function calculateDateDifference(startDate, endDate) {
    // Primeiro calcula anos completos
    let years = endDate.getFullYear() - startDate.getFullYear();
    
    // Verifica se já passou o aniversário este ano
    const currentMonth = endDate.getMonth();
    const currentDay = endDate.getDate();
    const startMonth = startDate.getMonth();
    const startDay = startDate.getDate();
    
    // Se ainda não chegou o aniversário este ano, subtrai 1 ano
    if (currentMonth < startMonth || (currentMonth === startMonth && currentDay < startDay)) {
        years--;
    }
    
    // Calcula meses completos desde o último aniversário
    let months = endDate.getMonth() - startDate.getMonth();
    if (months < 0) {
        months += 12;
    }
    
    // Ajusta os meses se o dia atual é anterior ao dia do aniversário
    if (endDate.getDate() < startDate.getDate()) {
        months--;
        if (months < 0) {
            months = 11;
        }
    }
    
    // Calcula dias desde o último dia completo do mês
    let days = endDate.getDate() - startDate.getDate();
    if (days < 0) {
        // Obter o último dia do mês anterior
        const lastDayOfMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
        days = lastDayOfMonth - startDate.getDate() + endDate.getDate();
    }
    
    return { years, months, days };
}

// Atualiza o contador de tempo em tempo real
function updateTimeTogether() {
    // Data de início do relacionamento (23 de agosto de 2021, às 00:00)
    const startDate = new Date('2021-08-23T00:00:00');
    const now = new Date();
    
    // Calcula a diferença precisa entre as datas
    const diff = calculateDateDifference(startDate, now);
    
    // Calcula o tempo decorrido desde a data inicial em milissegundos
    const elapsedMs = now - startDate;
    
    // Calcula dias totais, horas, minutos e segundos
    const totalDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(elapsedMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(elapsedMs / (1000 * 60));
    const totalSeconds = Math.floor(elapsedMs / 1000);
    
    // Calcula horas, minutos e segundos do dia atual
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    
    // Atualiza o texto
    document.getElementById('time-together').textContent = 
        `${diff.years} anos, ${diff.months} meses, ${diff.days} dias`;
        
    document.getElementById('detailed-time').textContent = 
        `${hours} horas, ${minutes} minutos e ${seconds} segundos`;
}

// Atualiza o horário atual
function updateCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('current-time').textContent = `${hours}:${minutes}`;
}

// Função para criar corações caindo
function createFallingHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    const heartIcons = ['❤️', '💖', '💕', '💗', '💓', '💘', '💝'];
    
    // Verificar se é um dispositivo móvel
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    // Função para criar um coração individual
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        
        // Ícone aleatório
        heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        
        // Posição horizontal aleatória
        const startRight = Math.random() * 100;
        heart.style.right = `${startRight}%`;
        
        // Tamanho aleatório (menor em dispositivos móveis)
        const size = isMobile ? 
            (Math.random() * 15 + 10) : 
            (Math.random() * 25 + 15);
        heart.style.fontSize = `${size}px`;
        
        // Duração aleatória da animação
        const duration = Math.random() * 5 + 5;
        heart.style.animationDuration = `${duration}s`;
        
        // Opacidade aleatória
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        
        heartsContainer.appendChild(heart);
        
        // Remover o coração após a animação terminar
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, duration * 1000);
    }
    
    // Intervalo baseado no tipo de dispositivo
    const interval = isMobile ? 800 : 300;
    
    // Criar corações em intervalos regulares
    const heartInterval = setInterval(createHeart, interval);
    
    // Criar alguns corações inicialmente
    const initialHearts = isMobile ? 5 : 10;
    for (let i = 0; i < initialHearts; i++) {
        setTimeout(createHeart, i * interval);
    }
}

// Inicializa a página
window.onload = function() {
    startSlideshow();
    updateTimeTogether();
    updateCurrentTime();
    // Atualiza o contador a cada segundo
    setInterval(updateTimeTogether, 1000);
    // Atualiza o horário a cada minuto
    setInterval(updateCurrentTime, 60000);
    updateSlideCounter();
    // Inicia a animação dos corações
    createFallingHearts();
    
    // Tenta reproduzir automaticamente (pode não funcionar em alguns navegadores)
    audio.play().then(() => {
        isPlaying = true;
        playOverlay.style.display = 'none';
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');
    }).catch(error => {
        console.log('Reprodução automática impedida. Mostrando overlay...');
        // Mostra o overlay para interação do usuário
        playOverlay.style.display = 'flex';
    });
};