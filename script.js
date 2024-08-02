const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");
const album1Button = document.getElementById("album1");
const album2Button = document.getElementById("album2");
const album3Button = document.getElementById("album3");

let allSongs = [
    {
      id: 0,
      title: "Defeat The Night",
      artist: "JPB",
      duration: "4:13",
      src: "soundfy-music/JPB - Defeat The Night (feat. Ashley Apollodor) [NCS Release].mp3",
    },
    {
      id: 1,
      title: "High Trap",
      artist: "JPB",
      duration: "3:12",
      src: "soundfy-music/JPB - High  Trap  NCS - Copyright Free Music.mp3",
    },
    {
      id: 2,
      title: "Invisible Trap",
      artist: "Julius Dreisig & Zeus X Crona",
      duration: "3:51",
      src: "soundfy-music/Julius Dreisig & Zeus X Crona - Invisible  Trap  NCS - Copyright Free Music.mp3",
    },
    {
      id: 3,
      title: "Earth Drumstep",
      artist: "K-391",
      duration: "3:54",
      src: "soundfy-music/K-391 - Earth  Drumstep  NCS - Copyright Free Music.mp3",
    },
    {
      id: 4,
      title: "Cetus House",
      artist: "Lensko",
      duration: "4:41",
      src: "soundfy-music/Lensko - Cetus  House  NCS - Copyright Free Music.mp3",
    },
];

let list1 = [
  {
    id: 5,
    title: "Shine Progressive House",
    artist: "Spektrem",
    duration: "4:19",
    src: "soundfy-music/Spektrem - Shine  Progressive House  NCS - Copyright Free Music.mp3",
  },
  {
    id: 6,
    title: "Cradles Pop",
    artist: "Sub Urban",
    duration: "3:29",
    src: "soundfy-music/Sub Urban - Cradles  Pop  NCS - Copyright Free Music.mp3",
  },
  {
    id: 7,
    title: "Feel Good Future House",
    artist: "Syn Cole",
    duration: "3:29",
    src: "soundfy-music/Syn Cole - Feel Good  Future House  NCS - Copyright Free Music.mp3",
  },
]

let list2 = [
  {
    id: 8,
    title: "Superhero",
    artist: "Unknown Brain",
    duration: "3:02",
    src: "soundfy-music/Unknown Brain - Superhero (feat. Chris Linton)  Trap  NCS - Copyright Free Music.mp3",
  },
  {
    id: 9,
    title: "Blank Melodic Dubstep",
    artist: "Disfigure",
    duration: "3:29",
    src: "soundfy-music/Disfigure - Blank  Melodic Dubstep  NCS - Copyright Free Music.mp3",
  },
]

const audio = new Audio();
let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  playButton.classList.add("playing");

  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  
  playButton.classList.remove("playing");
  audio.pause();
};

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];

    playSong(nextSong.id);
  }
};

const playPreviousSong = () => {
   if (userData?.currentSong === null) return;
   else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];

    playSong(previousSong.id);
   }
};

const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    
    pauseSong();
    setPlayerDisplay();
  }
  if(currentAlbum == 1) {
  allSongs = allSongs?.filter((song) => song.id !== id);
  }else if(currentAlbum == 2) {
    list1 = list1?.filter((song) => song.id !== id);
  }else{
    list2 = list2?.filter((song) => song.id !== id);
  };
  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs); 
  highlightCurrentSong(); 
  setPlayButtonAccessibleText(); 

  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      if(currentAlbum == 1) {
      allSongs = [{
        id: 0,
        title: "Defeat The Night",
        artist: "JPB",
        duration: "4:13",
        src: "soundfy-music/JPB - Defeat The Night (feat. Ashley Apollodor) [NCS Release].mp3",
      },
      {
        id: 1,
        title: "High Trap",
        artist: "JPB",
        duration: "3:12",
        src: "soundfy-music/JPB - High  Trap  NCS - Copyright Free Music.mp3",
      },
      {
        id: 2,
        title: "Invisible Trap",
        artist: "Julius Dreisig & Zeus X Crona",
        duration: "3:51",
        src: "soundfy-music/Julius Dreisig & Zeus X Crona - Invisible  Trap  NCS - Copyright Free Music.mp3",
      },
      {
        id: 3,
        title: "Earth Drumstep",
        artist: "K-391",
        duration: "3:54",
        src: "soundfy-music/K-391 - Earth  Drumstep  NCS - Copyright Free Music.mp3",
      },
      {
        id: 4,
        title: "Cetus House",
        artist: "Lensko",
        duration: "4:41",
        src: "soundfy-music/Lensko - Cetus  House  NCS - Copyright Free Music.mp3",
      },];
      userData.songs = [...allSongs];
    }else if(currentAlbum == 2) {
      list1 = [{
        id: 5,
        title: "Shine Progressive House",
        artist: "Spektrem",
        duration: "4:19",
        src: "soundfy-music/Spektrem - Shine  Progressive House  NCS - Copyright Free Music.mp3",
      },
      {
        id: 6,
        title: "Cradles Pop",
        artist: "Sub Urban",
        duration: "3:29",
        src: "soundfy-music/Sub Urban - Cradles  Pop  NCS - Copyright Free Music.mp3",
      },
      {
        id: 7,
        title: "Feel Good Future House",
        artist: "Syn Cole",
        duration: "3:29",
        src: "soundfy-music/Syn Cole - Feel Good  Future House  NCS - Copyright Free Music.mp3",
      },];
      userData.songs = [...list1];
    }else {
      list2 = [{
        id: 8,
        title: "Superhero",
        artist: "Unknown Brain",
        duration: "3:02",
        src: "soundfy-music/Unknown Brain - Superhero (feat. Chris Linton)  Trap  NCS - Copyright Free Music.mp3",
      },
      {
        id: 9,
        title: "Blank Melodic Dubstep",
        artist: "Disfigure",
        duration: "3:29",
        src: "soundfy-music/Disfigure - Blank  Melodic Dubstep  NCS - Copyright Free Music.mp3",
      },];
      userData.songs = [...list2];
    }
      renderSongs(sortSongs()); 
      setPlayButtonAccessibleText();
      resetButton.remove();
    });

  }
};

const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;

  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) songToHighlight.setAttribute("aria-current", "true");
};

const renderSongs = (array) => {
  const songsHTML = array
    .map((song)=> {
      return `
      <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `;
    })
    .join("");

  playlistSongs.innerHTML = songsHTML;
};

const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];

  playButton.setAttribute(
    "aria-label",
    song?.title ? `Play ${song.title}` : "Play"
  );
};

const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

let currentAlbum = 1;
const album1 = () => {
  userData.songs = [...allSongs];
  renderSongs(sortSongs());
  currentAlbum = 1;
}

const album2 = () => {
  userData.songs = [...list1];
  renderSongs(sortSongs());
  currentAlbum = 2;
}

const album3 = () => {
  userData.songs = [...list2];
  renderSongs(sortSongs());
  currentAlbum = 3;
}

playButton.addEventListener("click", () => {
    if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

pauseButton.addEventListener("click",  pauseSong);

nextButton.addEventListener("click", playNextSong);

previousButton.addEventListener("click", playPreviousSong);

shuffleButton.addEventListener("click", shuffle);

album1Button.addEventListener("click", album1);

album2Button.addEventListener("click", album2);

album3Button.addEventListener("click", album3);

audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

    if (nextSongExists) {
      playNextSong();
    } else {
      userData.currentSong = null;
      userData.songCurrentTime = 0;
        pauseSong();
        setPlayerDisplay();
        highlightCurrentSong();
        setPlayButtonAccessibleText();
    }
});

const sortSongs = () => {
  userData?.songs.sort((a,b) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
});

  return userData?.songs;
};

  let i = 10;
const addSong = () => {
  let title = document.getElementById('title_id').value;
  let artist = document.getElementById('artist_id').value;
  let source = document.getElementById('src_id').value;
  let duration = document.getElementById('duration_id').value;
  let currentId = i;
  if(currentAlbum == 1) {
  allSongs.push({id: currentId, title: title, artist: artist, duration: duration, src: source,},);
}else if(currentAlbum == 2) {
  list1.push({id: currentId, title: title, artist: artist, duration: duration, src: source,},);
}else if(currentAlbum == 3) {
  list2.push({id: currentId, title: title, artist: artist, duration: duartion, src: source,},);
}
  userData?.songs.push({id: currentId, title: title, artist: artist, duration: duration, src: source,},);
  i++;
  renderSongs(sortSongs());
}

renderSongs(sortSongs());
setPlayButtonAccessibleText();