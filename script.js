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
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

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
};

const playDice = function () {
  dice.classList.remove("hidden");
  let randNum = Math.floor(Math.random() * 6 + 1);
  if (randNum === 1) {
    currentScore.textContent = 0;
    dice.setAttribute("src", diceList[randNum - 1]);
    changeplayer();
  } else {
    dice.setAttribute("src", diceList[randNum - 1]);
    currentScore.textContent = Number(currentScore.textContent) + randNum;
  }
};

btnroll.addEventListener("click", function () {
  playDice();
});

btnhold.addEventListener("click", function () {
  score = playerActive.querySelector(".score");
  score.textContent =
    Number(score.textContent) + Number(currentScore.textContent);
  currentScore.textContent = 0;
  changeplayer();
});
btnnew.addEventListener("click", function () {
  let scores = document.querySelectorAll(".score");
  scores.forEach((item) => (item.textContent = 0));
  let currentScores = document.querySelectorAll(".current-score");
  currentScores.forEach((item) => (item.textContent = 0));
  dice.classList.add("hidden");
});
