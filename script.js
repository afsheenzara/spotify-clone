const songs = [
  {
    name: "Pretty Afternoon",
    artist: "Andrah",
    file: "songs/song1.mp3",
    image: "images/song1.jpeg"
  },
  {
    name: "Vibe",
    artist: "Spicyverse",
    file: "songs/song2.mp3",
    image: "images/song2.jpeg"
  }
];

const songList = document.getElementById("songList");
const nowPlaying = document.getElementById("nowPlaying");
const songImage = document.getElementById("songImage");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const audioPlayer = document.getElementById("audioPlayer");

let currentSongIndex = null;
let isPlaying = false;

songs.forEach((song, index) => {
  const songDiv = document.createElement("div");
  songDiv.classList.add("song");
  songDiv.innerText = `${song.name} - ${song.artist}`;
  songDiv.addEventListener("click", () => {
    loadSong(index);
  });
  songList.appendChild(songDiv);
});
// 🔍 Search functionality
const searchBar = document.getElementById("searchBar");
if (searchBar) {
  searchBar.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const songDivs = document.querySelectorAll(".song");
    songDivs.forEach(div => {
      const text = div.innerText.toLowerCase();
      div.style.display = text.includes(searchTerm) ? "block" : "none";
    });
  });
}


function loadSong(index) {
  currentSongIndex = index;
  const song = songs[index];
  audioPlayer.src = song.file;
  songImage.src = song.image;
  nowPlaying.innerText = `🎶 Now Playing: ${song.name} - ${song.artist}`;
  playAudio();
}

function playAudio() {
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.innerText = "⏸️ Pause";
}

function pauseAudio() {
  audioPlayer.pause();
  isPlaying = false;
  playPauseBtn.innerText = "▶️ Play";
}

playPauseBtn.addEventListener("click", () => {
  if (currentSongIndex === null) return;
  isPlaying ? pauseAudio() : playAudio();
});

// 🕒 Update progress bar
audioPlayer.addEventListener("timeupdate", () => {
  const currentTime = audioPlayer.currentTime;
  const duration = audioPlayer.duration;

  progressBar.max = duration;
  progressBar.value = currentTime;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

progressBar.addEventListener("input", () => {
  audioPlayer.currentTime = progressBar.value;
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
// ⏮️⏭️ Next and Previous buttons
document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentSongIndex === null) return;
  const nextIndex = (currentSongIndex + 1) % songs.length;
  loadSong(nextIndex);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentSongIndex === null) return;
  const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(prevIndex);
});
