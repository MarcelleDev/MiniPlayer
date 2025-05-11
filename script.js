const player = {
    musicas: [
        {
            titulo: "FOME",
            arquivo: "musicas/fome.mp3"
        },
        {
            titulo: "QQ CÊ QUER AQUI?",
            arquivo: "musicas/qq-ce-quer-aqui.mp3"
        },
        {
            titulo: "MELHOR QUE ONTEM",
            arquivo: "musicas/melhor-que-ontem.mp3"
        }
    ],
    indiceAtual: 0,
    audio: new Audio(),
    estaTocando: false
};

// Elementos DOM
const playPauseBtn = document.getElementById('play-pause');
const tituloElement = document.querySelector('.titulo');
const tempoAtualElement = document.querySelector('.tempo-atual');
const tempoTotalElement = document.querySelector('.tempo-total');
const barraProgresso = document.querySelector('.progresso');
const listaMusicas = document.querySelectorAll('.lista-musicas .musica');

// Funções
function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);
    return `${minutos}:${segundosRestantes.toString().padStart(2, '0')}`;
}

function carregarMusica() {
    const musica = player.musicas[player.indiceAtual];
    tituloElement.textContent = musica.titulo;
    player.audio.src = musica.arquivo;
    
    player.audio.addEventListener('loadedmetadata', () => {
        tempoTotalElement.textContent = formatarTempo(player.audio.duration);
    });
}

function togglePlayPause() {
    if (player.estaTocando) {
        player.audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        player.audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    player.estaTocando = !player.estaTocando;
}

// Event Listeners
playPauseBtn.addEventListener('click', togglePlayPause);

document.getElementById('proxima').addEventListener('click', () => {
    player.indiceAtual = (player.indiceAtual + 1) % player.musicas.length;
    carregarMusica();
    if (player.estaTocando) player.audio.play();
});

document.getElementById('anterior').addEventListener('click', () => {
    player.indiceAtual = (player.indiceAtual - 1 + player.musicas.length) % player.musicas.length;
    carregarMusica();
    if (player.estaTocando) player.audio.play();
});

// Atualizações de Tempo
player.audio.addEventListener('timeupdate', () => {
    const progresso = (player.audio.currentTime / player.audio.duration) * 100;
    barraProgresso.style.width = `${progresso}%`;
    tempoAtualElement.textContent = formatarTempo(player.audio.currentTime);
});

// Clique na Lista
listaMusicas.forEach((musicaDiv, index) => {
    musicaDiv.addEventListener('click', () => {
        player.indiceAtual = index;
        carregarMusica();
        if (player.estaTocando) player.audio.play();
    });
});

// Inicialização
carregarMusica();