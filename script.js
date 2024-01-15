console.log("Welcome to spotify")
//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs =[
    {
        songName: "Warriyo - Mortals (feat. Laura Brehm)", filepath: "songs/3.mp3", coverPath: "covers/10.jpg"
    },
    {
        songName: "Biba (Slick Trick X Toshi X Farasat Anees)", filepath: "songs/10.mp3", coverPath: "covers/1.jpg"
    },
    {
        songName: "Deaf Kev - Invincible (feat. Sendi Hoxha)", filepath: "songs/1.mp3", coverPath: "covers/2.jpg"
    }, 
    {
        songName: "Different Heaven & EH!DE - My Heart", filepath: "songs/5.mp3", coverPath: "covers/3.jpg"
    },
    {
        songName: "Janji - Heroes Tonight (feat. Johnning)", filepath: "songs/8.mp3", coverPath: "covers/4.jpg"
    },
    {
        songName: "Forever domastic NCS - Copyright", filepath: "songs/4.mp3", coverPath: "covers/5.jpg"
    },
    {
        songName: "Lost Sky - Where We Started (feat. Jex)", filepath: "songs/7.mp3", coverPath: "covers/6.jpg"
    },
    {
        songName: "Julius Dreisig & Zeus X Crona - Invisible", filepath: "songs/6.mp3", coverPath: "covers/7.jpg"
    },
    {
        songName: "KSHMR - Bombay Dreams (feat. Kavita Seth)", filepath: "songs/9.mp3", coverPath: "covers/8.jpg"
    },
    {
        songName: "Rampa - Necessity (Original Mix)", filepath: "songs/2.mp3", coverPath: "covers/9.jpg"
    },

]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    // element.getElementsByClassName("songName")[0].innerText = songs[i].coverPath;
});


// audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0; 
    }
})

//Listen to Events 
audioElement.addEventListener('timeupdate', ()=>{
    //update Seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})


const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=> {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})


document.getElementById('next').addEventListener('click', () => {
    updatePlayIcon(songIndex, false); // Update the current songItemPlay icon
    if (songIndex >= 9) 
    {
        songIndex = 0;
    } 
    else 
    {
        songIndex += 1;
    }
    updatePlayIcon(songIndex, true); // Update the next songItemPlay icon
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    updatePlayIcon(songIndex, false); // Update the current songItemPlay icon
    if (songIndex <= 0) 
    {
        songIndex = 9;
    } 
    else 
    {
        songIndex -= 1;
    }
    updatePlayIcon(songIndex, true); // Update the previous songItemPlay icon
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Function to update the play/pause icons in the songItemPlay elements
const updatePlayIcon = (index, isPlay) => {
    const playIcon = document.getElementById(index.toString());
    if (isPlay) {
        playIcon.classList.remove('fa-play-circle');
        playIcon.classList.add('fa-pause-circle');
    } else {
        playIcon.classList.remove('fa-pause-circle');
        playIcon.classList.add('fa-play-circle');
    }
};
