/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
export default class Scores {
  getScores() {
    const firstScore = document.querySelector(".firstScore");
    const secondScore = document.querySelector(".secondScore");
    const thirdScore = document.querySelector(".thirdScore");
    firstScore.textContent = `First score: ${
      localStorage.firstScore !== undefined ? localStorage.firstScore : "0"
    }`;
    secondScore.textContent = `Second score: ${
      localStorage.secondScore !== undefined ? localStorage.secondScore : "0"
    }`;
    thirdScore.textContent = `Third score: ${
      localStorage.thirdScore !== undefined ? localStorage.thirdScore : "0"
    }`;
  }

  setScores(score) {
    this.score = score;
    if (localStorage.firstScore === undefined) {
      localStorage.firstScore = 0;
      localStorage.secondScore = 0;
      localStorage.thirdScore = 0;
    }
    if (this.score > localStorage.firstScore) {
      localStorage.firstScore = this.score;
    } else if (this.score > localStorage.secondScore) {
      localStorage.secondScore = this.score;
    } else if (this.score > localStorage.thirdScore) {
      localStorage.thirdScore = this.score;
    }
  }
}
