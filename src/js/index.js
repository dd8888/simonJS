/* eslint-disable wrap-iife */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable quotes */
import { Howl } from "howler";
import _, { first } from "lodash";
import swal from "sweetalert";

const audioUrl1 = require("../assets/simonSound1.mp3");
const audioUrl2 = require("../assets/simonSound2.mp3");
const audioUrl3 = require("../assets/simonSound3.mp3");
const audioUrl4 = require("../assets/simonSound4.mp3");

const audioQ = new Howl({
  src: [audioUrl1],
});
const audioW = new Howl({
  src: [audioUrl2],
});
const audioE = new Howl({
  src: [audioUrl3],
});
const audioR = new Howl({
  src: [audioUrl4],
});

// eslint-disable-next-line quotes
const button = document.querySelector(".buttonStart");
const letterQ = document.querySelector(".q");
const letterW = document.querySelector(".w");
const letterE = document.querySelector(".e");
const letterR = document.querySelector(".r");
const difEasy = document.querySelector(".easy");
const difMedium = document.querySelector(".medium");
const difHard = document.querySelector(".hard");
const selector = document.querySelector(".selector");
const firstScore = document.querySelector(".firstScore");
const secondScore = document.querySelector(".secondScore");
const thirdScore = document.querySelector(".thirdScore");
firstScore.textContent = `First score: ${localStorage.firstScore}`;
secondScore.textContent = `Second score: ${localStorage.secondScore}`;
thirdScore.textContent = `Third score: ${localStorage.thirdScore}`;

let difficulty = "easy";
let loops = 4;
let streak = 0;

difEasy.addEventListener("click", function () {
  selector.style.left = "-67px";
  difficulty = "easy";
});
difMedium.addEventListener("click", function () {
  selector.style.left = "0px";
  difficulty = "medium";
});
difHard.addEventListener("click", function () {
  selector.style.left = "67px";
  difficulty = "hard";
});

const correctValue = document.querySelector(".correctAnswers");

// eslint-disable-next-line quotes
const arrayLetters = ["Q", "W", "E", "R"];

const stylesLetters = (element) => {
  const color = element.style.background;
  const animationStyles = {
    background: ["white", color],
    transform: ["scale(1.1)", "scale(1.0)"],
  };
  const animationsTiming = {
    duration: 1000,
    endDelay: 1000,
  };
  return [animationStyles, animationsTiming];
};

let isRunning = false;
let isFinished = false;
const arrayRandomLetters = [];

const getUserInput = () => {
  isFinished = true;
};

const animateSingleLetter = (letter) => {
  switch (letter) {
    case "Q":
      letterQ.animate(stylesLetters(letterQ)[0], stylesLetters(letterQ)[1]);
      audioQ.play();
      break;
    case "W":
      letterW.animate(stylesLetters(letterW)[0], stylesLetters(letterW)[1]);
      audioW.play();

      break;
    case "E":
      letterE.animate(stylesLetters(letterE)[0], stylesLetters(letterE)[1]);
      audioE.play();
      break;

    case "R":
      letterR.animate(stylesLetters(letterR)[0], stylesLetters(letterR)[1]);
      audioR.play();
      break;

    default:
      break;
  }
};

const getRandomLetter = (delay = 1000, iterations = 4) => {
  isRunning = true;
  button.disabled = true;
  button.style.background = "grey";
  (function loop(i) {
    setTimeout(function () {
      const randomLetter = _.sampleSize(arrayLetters);
      arrayRandomLetters.push(randomLetter);
      animateSingleLetter(randomLetter[0]);
      if (--i) {
        loop(i);
      } else {
        getUserInput();
      }
    }, delay); // delay
  })(iterations);
};

const setScores = (score) => {
  if (localStorage.firstScore === undefined) {
    localStorage.firstScore = 0;
    localStorage.secondScore = 0;
    localStorage.thirdScore = 0;
  }
  if (score > localStorage.firstScore) {
    localStorage.firstScore = score;
  } else if (score > localStorage.secondScore) {
    localStorage.secondScore = score;
  } else if (score > localStorage.thirdScore) {
    localStorage.thirdScore = score;
  }
};

const arrayAnswers = [];
let correctAnswers = 0;
const checkAnswer = (size) => {
  try {
    if (arrayAnswers[size - 1] === arrayRandomLetters[size - 1].toString()) {
      correctAnswers += 1;
      correctValue.textContent = `Correct answers: ${correctAnswers}`;
      if (correctAnswers === loops * streak) {
        setTimeout(() => {
          button.disabled = false;
          button.style.background = "rgb(30, 102, 210)";
        }, 200);
      }
    } else {
      setTimeout(() => {
        setScores(correctAnswers * 10);
        swal("Oops!", "You lost! 😔", "error").then((doClose) => {
          if (doClose) {
            window.location.reload();
          }
        });
      }, 100);
    }
  } catch (error) {
    console.log("");
  }
};
document.onkeydown = function (e) {
  if (isFinished === true) {
    arrayAnswers.push(e.key.toString().toUpperCase());
    animateSingleLetter(e.key.toString().toUpperCase());
    checkAnswer(arrayAnswers.length);
  }
};
button.addEventListener(
  "click",
  function () {
    difHard.disabled = true;
    difMedium.disabled = true;
    difEasy.disabled = true;
    difHard.style.background = "grey";
    difMedium.style.background = "grey";
    difEasy.style.background = "grey";

    if (difficulty === "easy") {
      getRandomLetter(1000, loops);
    } else if (difficulty === "medium") {
      loops = 6;
      getRandomLetter(800, loops);
    } else if (difficulty === "hard") {
      loops = 8;
      getRandomLetter(400, loops);
    }
    streak += 1;
  },
  false
);

const showRules = () => {
  if (localStorage.rules === undefined) {
    localStorage.rules = 1;
    swal(
      "Rules!",
      "Rules are simple. Players must repeat random sequences of sounds by pressing the colored keys in the correct order. ",
      "info"
    );
  }
};
showRules();
