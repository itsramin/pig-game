"use strict";
const diceList = [
  "media/dice-1.png",
  "media/dice-2.png",
  "media/dice-3.png",
  "media/dice-4.png",
  "media/dice-5.png",
  "media/dice-6.png",
  "media/dicegif3.gif",
];
const dice = document.querySelector(".dice");
const btnroll = document.querySelector(".btn--roll");
const btnnew = document.querySelector(".btn--new");
const btnhold = document.querySelector(".btn--hold");
let playerActive = document.querySelector(".player--active");
let currentScore = playerActive.querySelector(".current-score");
let score = playerActive.querySelector(".score");

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
const consolep = document.querySelector(".console");
const selectmulti = document.querySelector(".selectmulti");
const closemulti = document.querySelector(".closemulti");
const playersscores = document.querySelector(".playersscores");
let multiplayerIsOn = false;
let funcIsRunning = false;

//--------------------------- functions ---------------------------
//---------------------------------------------------------------

const playDice = async function () {
  funcIsRunning = true;
  dice.src = diceList[6];
  let randNum = Math.floor(Math.random() * 6 + 1);
  await wait(1.25);
  dice.src = diceList[randNum - 1];
  funcIsRunning = false;
  if (randNum === 1) {
    await wait(0.4);
    currentScore.textContent = 0;
    return changePlayer();
  }
  currentScore.textContent = +currentScore.textContent + randNum;

  return +currentScore.textContent;
};

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const changePlayer = function () {
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
  playerActive = document.querySelector(".player--active");
  currentScore = playerActive.querySelector(".current-score");
  score = playerActive.querySelector(".score");

  if (!multiplayerIsOn && player1.classList.contains("player--active"))
    playBot();
};

const hold = function () {
  score.textContent = +score.textContent + +currentScore.textContent;
  currentScore.textContent = 0;
  if (+score.textContent >= 5) return won();
  changePlayer();
};

const playBot = async function () {
  await wait(0.9);
  const score = await playDice();
  await wait(0.9);
  if (player0.classList.contains("player--active")) return;
  if (score > 5) {
    hold();
  } else {
    playBot();
  }
};

const won = function () {
  let winner;
  if (player0.classList.contains("player--active")) {
    winner = player0.querySelector(".name").value;
  } else if (multiplayerIsOn) {
    winner = document.querySelector(".player--2-name").value;
  } else {
    winner = "BOT";
  }

  winningpage.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.querySelector(".winnerName").textContent = `${winner}`;
  playersscores.textContent = ` (${
    player0.querySelector(".score").textContent
  } vs ${player1.querySelector(".score").textContent})`;
};

// ----- play new game -----
const newGame = function () {
  winningpage.classList.add("hidden");
  overlay.classList.add("hidden");

  document.querySelectorAll(".score").forEach((item) => (item.textContent = 0));

  document
    .querySelectorAll(".current-score")
    .forEach((item) => (item.textContent = 0));
  dice.classList.add("hidden");

  player1.classList.remove("player--active");
  player0.classList.add("player--active");
  playerActive = document.querySelector(".player--active");
  currentScore = playerActive.querySelector(".current-score");
  score = playerActive.querySelector(".score");
};

// ----- fullscreen -----
function openFullscreen() {
  let src = full.getAttribute("src");
  if (src === "media/full.svg") {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
    full.setAttribute("src", "media/unfull.svg");
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
    full.setAttribute("src", "media/full.svg");
  }
}

//--------------------------- buttons ---------------------------
//---------------------------------------------------------------
// ----- roll button -----
btnroll.addEventListener("click", function () {
  if (funcIsRunning) return;
  dice.classList.remove("hidden");
  if (multiplayerIsOn) {
    return playDice();
  }
  if (player0.classList.contains("player--active")) playDice();
});

btnhold.addEventListener("click", function () {
  if (
    (!funcIsRunning &&
      !multiplayerIsOn &&
      player0.classList.contains("player--active") &&
      +currentScore.textContent !== 0) ||
    (!funcIsRunning && multiplayerIsOn && +currentScore.textContent !== 0)
  ) {
    hold();
  }
});

btnnew.addEventListener("click", newGame);
carryon.addEventListener("click", newGame);

// ----- Multi player  button -----
btnmulti.addEventListener("click", function () {
  overlay.classList.add("hidden");
  selectmulti.classList.add("hidden");
  newGame();
  multiplayerIsOn = true;

  document.querySelector(".player--2-name").classList.remove("hidden");
  document.querySelector(".bot--name").classList.add("hidden");
});
// ----- Single player button -----
btnsingle.addEventListener("click", function () {
  overlay.classList.add("hidden");
  selectmulti.classList.add("hidden");
  newGame();
  multiplayerIsOn = false;

  document.querySelector(".player--2-name").classList.add("hidden");
  document.querySelector(".bot--name").classList.remove("hidden");
});

// ----- player option page button -----
consolep.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  selectmulti.classList.remove("hidden");
});
