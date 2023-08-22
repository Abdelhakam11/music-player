const songName= document.getElementById('song-name');
const artist= document.getElementById('artist');
const music = document.querySelector('audio');
const image = document.querySelector('img');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const songs = [
    {
      name: 'jacinto-1',
      displayName: 'Electric Chill Machine',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-2',
      displayName: 'Seven Nation Army (Remix)',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-3',
      displayName: 'Goodnight, Disco Queen',
      artist: 'Jacinto Design',
    },
    {
      name: 'metric-1',
      displayName: 'Front Row (Remix)',
      artist: 'Metric/Jacinto Design',
    },
  ];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    songName.innerHTML=song.displayName;
    artist.innerHTML=song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

let songIndex=0;
// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
  }

function updateProgressBar(e) {
  if(isPlaying){
    const currentTime =e.target.currentTime;
    const duration = e.target.duration;
    const width = currentTime/duration*100;
    const currentTimeMin= Math.floor(currentTime/60);
    const currentTimeSec= Math.floor(currentTime%60);

    if(currentTimeSec<10){
      currentTimeEl.innerHTML=`${currentTimeMin}:0${currentTimeSec}`;
    }
    else{
      currentTimeEl.innerHTML=`${currentTimeMin}:${currentTimeSec}`;
    }
    progress.style=`width: ${width}%;`
  }

}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const {duration}=music;
  music.currentTime = (clickX / width) * duration;
}


nextBtn.addEventListener('click',nextSong);
prevBtn.addEventListener('click', prevSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);