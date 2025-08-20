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
        
        // Função para calcular a diferença entre datas de forma precisa
        function calculateDateDifference(startDate, endDate) {
            let years = endDate.getFullYear() - startDate.getFullYear();
            let months = endDate.getMonth() - startDate.getMonth();
            let days = endDate.getDate() - startDate.getDate();
            
            // Ajuste para meses/dias negativos
            if (days < 0) {
                months--;
                // Obter o último dia do mês anterior
                const lastDayOfMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
                days += lastDayOfMonth;
            }
            
            if (months < 0) {
                years--;
                months += 12;
            }
            
            return { years, months, days };
        }
        
        // Atualiza o contador de tempo em tempo real
        function updateTimeTogether() {
            // Data de início do relacionamento (23 de agosto de 2021)
            const startDate = new Date('2021-08-23');
            const now = new Date();
            
            // Calcula a diferença precisa entre as datas
            const diff = calculateDateDifference(startDate, now);
            
            // Calcula horas, minutos e segundos
            const seconds = Math.floor((now - startDate) / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            
            const remainingHours = hours % 24;
            const remainingMinutes = minutes % 60;
            const remainingSeconds = seconds % 60;
            
            // Atualiza o texto
            document.getElementById('time-together').textContent = 
                `${diff.years} anos, ${diff.months} meses, ${diff.days} dias`;
                
            document.getElementById('detailed-time').textContent = 
                `${remainingHours} horas, ${remainingMinutes} minutos e ${remainingSeconds} segundos`;
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