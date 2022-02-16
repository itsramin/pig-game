"use strict";
const diceList = [
  "dice-1.png",
  "dice-2.png",
  "dice-3.png",
  "dice-4.png",
  "dice-5.png",
  "dice-6.png",
];
const dice = document.querySelector(".dice");
const btnroll = document.querySelector(".btn--roll");
const btnnew = document.querySelector(".btn--new");
const btnhold = document.querySelector(".btn--hold");
let playerActive = document.querySelector(".player--active");
let currentScore = playerActive.querySelector(".current-score");
let score = playerActive.querySelector(".score");
let winner = playerActive.querySelector(".name").textContent;
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const winningpage = document.querySelector(".winningpage");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".close-modal");

const changeplayer = function () {
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
};

const playDice = function () {
  dice.classList.remove("hidden");
  let randNum = Math.floor(Math.random() * 6 + 1);
  if (randNum === 1) {
    currentScore.textContent = 0;
    changeplayer();
  } else {
    currentScore.textContent = Number(currentScore.textContent) + randNum;
  }
  dice.setAttribute("src", diceList[randNum - 1]);
};

btnroll.addEventListener("click", function () {
  playDice();
});

btnhold.addEventListener("click", function () {
  winner = playerActive.querySelector(".name").value;
  score.textContent =
    Number(score.textContent) + Number(currentScore.textContent);
  if (Number(score.textContent) < 100) {
    currentScore.textContent = 0;
    changeplayer();
  } else {
    winningpage.classList.remove("hidden");
    overlay.classList.remove("hidden");
    document.querySelector(".winnerName").textContent = winner;
  }
});
const newGame = function () {
  winningpage.classList.add("hidden");
  overlay.classList.add("hidden");
  let scores = document.querySelectorAll(".score");
  scores.forEach((item) => (item.textContent = 0));
  let currentScores = document.querySelectorAll(".current-score");
  currentScores.forEach((item) => (item.textContent = 0));
  dice.classList.add("hidden");
};
btnnew.addEventListener("click", newGame);
closeModal.addEventListener("click", newGame);
