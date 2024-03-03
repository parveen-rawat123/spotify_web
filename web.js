// porfile js
document.addEventListener("DOMContentLoaded", () => {
  const profile = document.querySelector(".nav_badge .light");
  const myname = document.querySelector(".itsme_5");

  profile.addEventListener("mouseenter", () => {
    myname.style.display = "block";
  });
  profile.addEventListener("mouseleave", () => {
    myname.style.display = "none";
  });
});

function showHideElement(triggerSelector, targetSelector) {
  const trigger = document.querySelector(triggerSelector);
  const target = document.querySelector(targetSelector);

  trigger.addEventListener("mouseenter", () => {
    target.style.display = "block";
  });

  trigger.addEventListener("mouseleave", () => {
    target.style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  showHideElement(".lib_option", ".itsme");
  showHideElement(".theplus", ".itsme_2");
  showHideElement(".shomore", ".itsme_3");
  showHideElement(".bell", ".itsme_4");
  showHideElement(".nav_badge .light", ".itsme_5");
  showHideElement(".likesong i", ".like");
  showHideElement(".main_queue", ".queue");
  showHideElement(".main_muteicon", ".Muteicon");
  showHideElement(".main_connectdice", ".connectdevice");
});



// music

let currentsong = new Audio();
let songs;
function secondToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);

  let minutesString = String(minutes).padStart(2, "0");
  let secondsString = String(remainingSeconds).padStart(2, "0");
  return `${minutesString}:${secondsString}`;
}
//https://raw.githubusercontent.com/parveen-rawat123/spotify_web/main/songs/Aam%20Jahe%20Munde%20_%20Parmish%20Verma.mp3

let play = document.querySelector("#pause");


async function getsongs() {
  let a = await fetch("https://raw.githubusercontent.com/parveen-rawat123/spotify_web/main/songs/");
  let responce = await a.text();
  let div = document.createElement("div");
  div.innerHTML = responce;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}
const playmusice = (track, pause = false) => {
  //  let audio = new Audio("/songs/" + track)
  currentsong.src = "/songs/" + track;
  if (!pause) {
    currentsong.play();
    play.src = "paused.svg";
  }
  document.querySelector(".first").innerHTML = decodeURI(track);
};

async function main() {
  //get the list of all songs
  songs = await getsongs();
  playmusice(songs[0], true);
  // console.log(songs);
  // show all the song playlist
  songUl = document.querySelector(".song_list ul");
  for (const song of songs) {
    songUl.innerHTML =
      songUl.innerHTML +
      `<li>
                         <img  src="music.svg" alt="">
                     <div class="info"><div> ${song.replaceAll("%20", " ")}</div>
                      </div>
                        <div class="playbtn">
                            <span> Play Now</span>
                            <img src="playnow.svg" alt="">
                        </div>
                  </li>`;
  }
  Array.from(
    document.querySelector(".song_list").getElementsByTagName("li")
  ).forEach((element) => {
    element.addEventListener("click", (e) => {
      playmusice(
        element.querySelector(".info").firstElementChild.innerHTML.trim()
      );
    });
  });

  //next play and previous
  play.addEventListener("click", () => {
    if (currentsong.paused) {
      currentsong.play();
      play.src = "paused.svg";
    } else {
      currentsong.pause();
      play.src = "play.svg";
    }
  });

  // listen for time update fuction
  currentsong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${secondToMinutesSeconds(
      currentsong.currentTime
    )}/
  ${secondToMinutesSeconds(currentsong.duration)}`;

    let seekbar = document.querySelector(".seekbaar");
    seekbar.style.left =
      (currentsong.currentTime / currentsong.duration) * 100 + "%";
  });
  // seekbaar event
  let playbackbar = document.querySelector(".playback_bar");
  playbackbar.addEventListener("click", (e) => {
    let parcent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".seekbaar").style.left = parcent + "%";
    currentsong.currentTime = (currentsong.duration * parcent) / 100;
  });

  //add an event listener previous and next
  let previous = document.querySelector("#previous");
  let next = document.querySelector("#next");

  previous.addEventListener("click", () => {
    let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
    if ((index - 1) >= 0) {
      playmusice(songs[index - 1]);
    }
  });

  next.addEventListener("click", () => {
    currentsong.pause()
    let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
    if ((index + 1) < songs.length) {
      playmusice(songs[index + 1]);
    }
  });

// addevent to volume
document.querySelector(".progress_bar").addEventListener("change",(e)=>{
   console.log(e)
   currentsong.volume = parseInt(e.target.value)/100
});

}
main();


 //like song 
 let likesong = document.querySelector(".likesong i ");
 likesong.addEventListener("click",()=>{
  if(likesong.style.color === "white"){
    likesong.style.color = "red"
  }
  else{
    likesong.style.color =  "white";
  }
 })
