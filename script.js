"use strict";
const diceList = [
  "dice-1.png",
  "dice-2.png",
  "dice-3.png",
  "dice-4.png",
  "dice-5.png",
  "dice-6.png",
  "dicegif.gif",
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
const closeModal = document.querySelector(".close-modal");
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
let multiplayerIsOn = true;
let divele = document.createElement("div");
let divele2 = document.createElement("div");

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
function change2player() {
  player1.classList.remove("player--active");
  player0.classList.add("player--active");
  playerActive = document.querySelector(".player--active");
  currentScore = playerActive.querySelector(".current-score");
  score = playerActive.querySelector(".score");
}
function change2bot() {
  player0.classList.remove("player--active");
  player1.classList.add("player--active");
  playerActive = document.querySelector(".player--active");
  currentScore = playerActive.querySelector(".current-score");
  score = playerActive.querySelector(".score");
  if (multiplayerIsOn === false) {
    loop1: do {
      dice.setAttribute("src", diceList[6]);
      let randNum = Math.floor(Math.random() * 6 + 1);
      if (randNum === 1) {
        dice.setAttribute("src", diceList[randNum - 1]);
        currentScore.textContent = 0;
        change2player;
        break loop1;
      } else {
        dice.setAttribute("src", diceList[randNum - 1]);
        currentScore.textContent = Number(currentScore.textContent) + randNum;
      }
    } while (Number(currentScore.textContent) < 20);

    setTimeout(hold, 1000);
  }
}

function playDice() {
  dice.classList.remove("hidden");
  dice.setAttribute("src", diceList[6]);
  let randNum = Math.floor(Math.random() * 6 + 1);
  let playername = playerActive.querySelector(".name").value;
  setTimeout(function () {
    dice.setAttribute("src", diceList[randNum - 1]);
    if (randNum === 1) {
      currentScore.textContent = 0;
      if (multiplayerIsOn === true) {
        change();
      } else {
        if (playername === "BOT") {
          change2player();
        } else {
          change2bot();
        }
      }
    } else {
      currentScore.textContent = Number(currentScore.textContent) + randNum;
    }
  }, 1240);
}
function hold() {
  if (multiplayerIsOn === true) {
    winner = playerActive.querySelector(".name").value;
  } else {
    if (playerActive.classList.contains(".player--0")) {
      winner = playerActive.querySelector(".name").value;
    } else {
      winner = "BOT";
    }
  }
  score.textContent =
    Number(score.textContent) + Number(currentScore.textContent);
  if (Number(score.textContent) < 100) {
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
    //with ${currentScore.textContent} score
  }
}
function openFullscreen() {
  let src = full.getAttribute("src");
  if (src === "full.png") {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
    full.setAttribute("src", "unfull.png");
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
    full.setAttribute("src", "full.png");
  }
}
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

btnroll.addEventListener("click", function () {
  if (playerActive.querySelector(".name").value !== "BOT") {
    playDice();
  }
});

btnhold.addEventListener("click", function () {
  if (playerActive.querySelector(".name").value !== "BOT") {
    hold();
  }
});

btnnew.addEventListener("click", newGame);
closeModal.addEventListener("click", newGame);
howto.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  howtopage.classList.remove("hidden");
});

closeinfo.addEventListener("click", function () {
  overlay.classList.add("hidden");
  howtopage.classList.add("hidden");
});
closemulti.addEventListener("click", function () {
  overlay.classList.add("hidden");
  selectmulti.classList.add("hidden");
});

btnmulti.addEventListener("click", function () {
  overlay.classList.add("hidden");
  selectmulti.classList.add("hidden");
  newGame();
  multiplayerIsOn = true;
  player1.removeChild(player1.firstElementChild);

  divele.innerHTML =
    '<input onClick="this.setSelectionRange(0, this.value.length)" class="name" type="text" id="name--1" value="PLAYER 2"/>';

  player1.prepend(divele);
});

btnsingle.addEventListener("click", function () {
  overlay.classList.add("hidden");
  selectmulti.classList.add("hidden");
  newGame();
  multiplayerIsOn = false;
  player1.removeChild(player1.firstElementChild);

  divele.innerHTML =
    '<input onClick="this.setSelectionRange(0, this.value.length)" class="name" type="text" id="name--1" value="BOT"/>';
  // divele.innerHTML = '<h2 class="name" id="name--1" value="BOT">BOT</h2>';
  player1.prepend(divele);
});

console.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  selectmulti.classList.remove("hidden");
});
