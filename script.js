"use strict";
const diceList = [
  "media/dice-1.png",
  "media/dice-2.png",
  "media/dice-3.png",
  "media/dice-4.png",
  "media/dice-5.png",
  "media/dice-6.png",
  "media/dicegif.gif",
];
const dice = document.querySelector(".dice");
const btnroll = document.querySelector(".btn--roll");
const btnnew = document.querySelector(".btn--new");
const btnhold = document.querySelector(".btn--hold");
let playerActive = document.querySelector(".player--active");
let currentScore = playerActive.querySelector(".current-score");
let score = playerActive.querySelector(".score");
let winner = playerActive.querySelector(".name");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const winningpage = document.querySelector(".winningpage");
const overlay = document.querySelector(".overlay");
const carryon = document.querySelector(".carryon");
const closeinfo = document.querySelector(".closeinfo");
const howto = document.querySelector(".howto");
const howtopage = document.querySelector(".howtopage");
const full = document.querySelector(".full");
const elem = document.documentElement;
const btnmulti = document.querySelector(".btn--multi");
const btnsingle = document.querySelector(".btn--single");
const console = document.querySelector(".console");
const selectmulti = document.querySelector(".selectmulti");
const closemulti = document.querySelector(".closemulti");
const playersscores = document.querySelector(".playersscores");
let multiplayerIsOn = false;
let divele = document.createElement("div");

//--------------------------- buttons ---------------------------
//---------------------------------------------------------------
// ----- Change player in multiplayer mode -----
function change() {
  if (player0.classList.contains("player--active")) {
    player0.classList.remove("player--active");
    player1.classList.add("player--active");
  } else {
    player1.classList.remove("player--active");
    player0.classList.add("player--active");
  }
  playerActive = document.querySelector(".player--active");
  currentScore = playerActive.querySelector(".current-score");
  score = playerActive.querySelector(".score");
}
// ----- Change player to player in multiplayer mode -----
function change2player() {
  player1.classList.remove("player--active");
  player0.classList.add("player--active");
  playerActive = document.querySelector(".player--active");
  currentScore = playerActive.querySelector(".current-score");
  score = playerActive.querySelector(".score");
}
// ----- Change player to bot in multiplayer mode -----
function change2bot() {
  player0.classList.remove("player--active");
  player1.classList.add("player--active");
  playerActive = document.querySelector(".player--active");
  currentScore = playerActive.querySelector(".current-score");
  score = playerActive.querySelector(".score");
  setTimeout(function () {
    dice.setAttribute("src", diceList[6]);
    let randNum = Math.floor(Math.random() * 6 + 1);
    if (randNum === 1) {
      setTimeout(function () {
        dice.setAttribute("src", diceList[randNum - 1]);
        currentScore.textContent = 0;
      }, 1240);
      setTimeout(change2player, 2000);
    } else {
      setTimeout(function () {
        dice.setAttribute("src", diceList[randNum - 1]);
        currentScore.textContent = Number(currentScore.textContent) + randNum;
      }, 1240);
      setTimeout(function () {
        dice.setAttribute("src", diceList[6]);
        let randNum = Math.floor(Math.random() * 6 + 1);
        if (randNum === 1) {
          setTimeout(function () {
            dice.setAttribute("src", diceList[randNum - 1]);
            currentScore.textContent = 0;
          }, 1240);
          setTimeout(change2player, 1240 + 700);
        } else {
          setTimeout(function () {
            dice.setAttribute("src", diceList[randNum - 1]);
            currentScore.textContent =
              Number(currentScore.textContent) + randNum;
          }, 1240);
        }
      }, 1240 + 1000);

      setTimeout(hold, 1240 + 1240 + 2500);
    }
  }, 1000);

  // setTimeout(playDice, 1000);
  // if (playDice !== 1) {
  //   setTimeout(playDice, 3000);
  // }
}
// ----- play dice -----
function playDice() {
  dice.classList.remove("hidden");
  dice.setAttribute("src", diceList[6]);
  let playerActive = document.querySelector(".player--active");
  let randNum = Math.floor(Math.random() * 6 + 1);
  // let playername = playerActive.querySelector(".name").value;
  setTimeout(function () {
    dice.setAttribute("src", diceList[randNum - 1]);
    if (randNum === 1) {
      currentScore.textContent = 0;
      if (multiplayerIsOn === true) {
        setTimeout(change, 300);
      } else {
        if (playerActive.classList.contains(".bot")) {
          console.log("change to player");
          setTimeout(change2player, 300);
        } else {
          setTimeout(change2bot, 300);
        }
      }
    } else {
      setTimeout(function () {
        currentScore.textContent = Number(currentScore.textContent) + randNum;
      }, 300);
    }
  }, 1240);
  return randNum;
}
// ----- hold current score -----
function hold() {
  if (multiplayerIsOn === true) {
    winner = playerActive.querySelector(".name").value;
  } else {
    if (playerActive.classList.contains("bot")) {
      winner = "BOT";
    } else {
      winner = playerActive.querySelector(".name").value;
    }
  }
  score.textContent =
    Number(score.textContent) + Number(currentScore.textContent);
  if (Number(score.textContent) < 10) {
    currentScore.textContent = 0;
    if (multiplayerIsOn === true) {
      change();
    } else {
      if (winner === "BOT") {
        change2player();
      } else {
        change2bot();
      }
    }
  } else {
    winningpage.classList.remove("hidden");
    overlay.classList.remove("hidden");
    document.querySelector(".winnerName").textContent = `${winner}`;
    playersscores.textContent = ` (${
      player0.querySelector(".score").textContent
    } vs ${player1.querySelector(".score").textContent}):`;
    //with ${currentScore.textContent} score
  }
}
// ----- fullscreen -----
function openFullscreen() {
  let src = full.getAttribute("src");
  if (src === "media/full.png") {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
    full.setAttribute("src", "media/unfull.png");
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
    full.setAttribute("src", "media/full.png");
  }
}
// ----- play new game -----
function newGame() {
  winningpage.classList.add("hidden");
  overlay.classList.add("hidden");
  let scores = document.querySelectorAll(".score");
  scores.forEach((item) => (item.textContent = 0));
  let currentScores = document.querySelectorAll(".current-score");
  currentScores.forEach((item) => (item.textContent = 0));
  dice.classList.add("hidden");
  player1.classList.remove("player--active");
  player0.classList.add("player--active");
  playerActive = document.querySelector(".player--active");
  currentScore = playerActive.querySelector(".current-score");
  score = playerActive.querySelector(".score");
}

//--------------------------- buttons ---------------------------
//---------------------------------------------------------------
// ----- roll button -----
btnroll.addEventListener("click", function () {
  if (playerActive.querySelector(".name").value !== "BOT") {
    playDice();
  }
});
// ----- hold button -----
btnhold.addEventListener("click", function () {
  if (playerActive.querySelector(".name").value !== "BOT") {
    hold();
  }
});
// ----- information page button -----
howto.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  howtopage.classList.remove("hidden");
});
// ----- close information page button -----
closeinfo.addEventListener("click", function () {
  overlay.classList.add("hidden");
  howtopage.classList.add("hidden");
});
// ----- close multiplayer page button -----
closemulti.addEventListener("click", function () {
  overlay.classList.add("hidden");
  selectmulti.classList.add("hidden");
});
// ----- Multi player  button -----
btnmulti.addEventListener("click", function () {
  overlay.classList.add("hidden");
  selectmulti.classList.add("hidden");
  newGame();
  multiplayerIsOn = true;
  player1.removeChild(player1.firstElementChild);

  divele.innerHTML =
    '<input onClick="this.setSelectionRange(0, this.value.length)" class="name" type="text" id="name--1" value="PLAYER 2"/>';

  player1.prepend(divele);
  player1.classList.remove("bot");
});
// ----- Single player button -----
btnsingle.addEventListener("click", function () {
  overlay.classList.add("hidden");
  selectmulti.classList.add("hidden");
  newGame();
  multiplayerIsOn = false;
  player1.removeChild(player1.firstElementChild);

  // divele.innerHTML =
  //   '<input onClick="this.setSelectionRange(0, this.value.length)" class="name" type="text" id="name--1" value="BOT"/>';
  divele.innerHTML = '<h2 class="name" id="name--1" value="BOT">BOT</h2>';
  player1.prepend(divele);
  player1.classList.add("bot");
});
// ----- player option page button -----
console.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  selectmulti.classList.remove("hidden");
});
// ----- new game button -----
btnnew.addEventListener("click", newGame);
// ----- close rotate button -----
carryon.addEventListener("click", newGame);
