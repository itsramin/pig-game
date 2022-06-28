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
const el = document.documentElement;
const dice = document.querySelector(".dice");
const overlay = document.querySelector(".overlay");
const btnnew = document.querySelector(".btn--new");
const btnroll = document.querySelector(".btn--roll");
const btnhold = document.querySelector(".btn--hold");
const player0 = document.querySelector(".player--0");
const infoBox = document.querySelector(".info--box");
const player1 = document.querySelector(".player--1");
const btnmulti = document.querySelector(".btn--multi");
const infoIcon = document.querySelector(".info--icon");
const multiBox = document.querySelector(".multi--box");
const winnerBox = document.querySelector(".winner--box");
const playAgain = document.querySelector(".play--again");
const infoClose = document.querySelector(".info--close");
const fullscreen = document.querySelector(".fullscreen");
const btnsingle = document.querySelector(".btn--single");
const multiIcon = document.querySelector(".multi--icon");
const multiClose = document.querySelector(".multi--close");
const playersScores = document.querySelector(".players--scores");

let funcIsRunning = false;
let multiplayerIsOn = false;
let playerActive = document.querySelector(".player--active");
let score = playerActive.querySelector(".score");
let currentScore = playerActive.querySelector(".current--score");

//--------------------------- functions -------------------------
//---------------------------------------------------------------

// play dice and return number
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

// wait function
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// change player
const changePlayer = function () {
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
  playerActive = document.querySelector(".player--active");
  currentScore = playerActive.querySelector(".current--score");
  score = playerActive.querySelector(".score");

  if (!multiplayerIsOn && player1.classList.contains("player--active"))
    playBot();
};

// hold current score
const hold = function () {
  score.textContent = +score.textContent + +currentScore.textContent;
  currentScore.textContent = 0;
  if (+score.textContent >= 100) return won();
  changePlayer();
};

// bot play strategy
const playBot = async function () {
  await wait(0.9);
  const score = await playDice();
  await wait(0.9);
  if (player0.classList.contains("player--active")) return;
  if (score > 15) {
    hold();
  } else {
    playBot();
  }
};

// show who won
const won = function () {
  let winner;
  if (player0.classList.contains("player--active")) {
    winner = player0.querySelector(".name").value;
  } else if (multiplayerIsOn) {
    winner = document.querySelector(".player--2-name").value;
  } else {
    winner = "BOT";
  }

  winnerBox.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.querySelector(".winner--name").textContent = `${winner}`;
  playersScores.textContent = ` (${
    player0.querySelector(".score").textContent
  } vs ${player1.querySelector(".score").textContent})`;
};

//  play new game
const newGame = function () {
  winnerBox.classList.add("hidden");
  overlay.classList.add("hidden");

  document.querySelectorAll(".score").forEach((item) => (item.textContent = 0));

  document
    .querySelectorAll(".current--score")
    .forEach((item) => (item.textContent = 0));
  dice.classList.add("hidden");

  player1.classList.remove("player--active");
  player0.classList.add("player--active");
  playerActive = document.querySelector(".player--active");
  currentScore = playerActive.querySelector(".current--score");
  score = playerActive.querySelector(".score");
};

//  fullscreen page
const openFullScreen = function () {
  let isFull = fullscreen.classList.contains("fa-expand");

  if (isFull) {
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      /* Safari */
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      /* IE11 */
      el.msRequestFullscreen();
    }
    fullscreen.classList.add("fa-compress");
    fullscreen.classList.remove("fa-expand");
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
    fullscreen.classList.remove("fa-compress");
    fullscreen.classList.add("fa-expand");
  }
};

//  close page
const close = function () {
  overlay.classList.add("hidden");
  this.parentElement.classList.add("hidden");
};

//--------------------------- handlers  -------------------------
//---------------------------------------------------------------
//  roll button
btnroll.addEventListener("click", function () {
  if (funcIsRunning) return;
  dice.classList.remove("hidden");
  if (multiplayerIsOn) {
    return playDice();
  }
  if (player0.classList.contains("player--active")) playDice();
});

//  hold button
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

// new game and play again button
btnnew.addEventListener("click", function () {
  if (!funcIsRunning) newGame();
});
playAgain.addEventListener("click", newGame);

//  Multi player  button
btnmulti.addEventListener("click", function () {
  overlay.classList.add("hidden");
  multiBox.classList.add("hidden");
  newGame();
  multiplayerIsOn = true;

  document.querySelector(".player--2-name").classList.remove("hidden");
  document.querySelector(".bot--name").classList.add("hidden");
});

//  Single player button
btnsingle.addEventListener("click", function () {
  overlay.classList.add("hidden");
  multiBox.classList.add("hidden");
  newGame();
  multiplayerIsOn = false;

  document.querySelector(".player--2-name").classList.add("hidden");
  document.querySelector(".bot--name").classList.remove("hidden");
});

//  player option page button
multiIcon.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  multiBox.classList.remove("hidden");
});

//  information page button
infoIcon.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  infoBox.classList.remove("hidden");
});

//  close information page
infoClose.addEventListener("click", close);

//  close multiplayer page
multiClose.addEventListener("click", close);

// full screen button
fullscreen.addEventListener("click", openFullScreen);
