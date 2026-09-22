const trackMap = {
    1: {
        title: 'Ela Partiu',
        artist: 'Tim Maia',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    2: {
        title: 'Os Moleque é Liso',
        artist: 'Mc Rodolfinho',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    3: {
        title: 'Ai Se Eu Te Pego',
        artist: 'Michel Teló',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    }
};

const playerTitle = document.getElementById('player-title');
const playerState = document.getElementById('player-state');
const fallbackAudio = document.getElementById('fallback-audio');

const playTrack = (trackId) => {
    const track = trackMap[trackId];
    if (!track || !fallbackAudio) return;

    if (playerTitle) {
        playerTitle.textContent = `${track.title} • ${track.artist}`;
    }

    if (playerState) {
        playerState.textContent = 'Tocando';
    }

    fallbackAudio.src = track.audioUrl;
    fallbackAudio.load();
    fallbackAudio.play();

    const target = document.getElementById('song-message');
    if (target) {
        target.textContent = `Tocando: ${track.title} - ${track.artist}.`;
    }
};

document.querySelectorAll('.song-card').forEach((card) => {
    const showMessage = () => {
        const target = document.getElementById('song-message');
        if (target) {
            target.textContent = 'Clique em Ouvir agora mesmo para escutar nossas músicas.';
        }
    };

    card.addEventListener('click', () => {
        showMessage();
        playTrack(card.dataset.track);
    });

    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            showMessage();
            playTrack(card.dataset.track);
        }
    });
});

if (fallbackAudio) {
    fallbackAudio.addEventListener('play', () => {
        if (playerState) playerState.textContent = 'Tocando';
    });

    fallbackAudio.addEventListener('pause', () => {
        if (playerState) playerState.textContent = 'Pausado';
    });
}

const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');

const applyTheme = (isDark) => {
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

if (toggle) {
    toggle.addEventListener('click', () => {
        applyTheme(!root.classList.contains('dark'));
    });
}