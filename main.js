const typing = document.querySelector(".typing");
const randomWordEl = document.querySelector(".random-word");
const inputEl = document.querySelector(".input");
const timeEl = document.querySelector(".time");
const levelEL = document.querySelector(".level");
const scoreEl = document.querySelector(".score");

const bgModal = document.querySelector(".bg-modal");
const modal = document.querySelector(".modal");
const scoreLevel = document.querySelector(".score-level");
const againBtn = document.querySelector(".again-btn");

const easy = document.querySelector('#easy')
const medium = document.querySelector('#medium')
const hard = document.querySelector('#hard')

let storge = JSON.parse(localStorage.getItem('levelTyping')) ? JSON.parse(localStorage.getItem('levelTyping')) : 'easy'
let API = "https://random-word-api.herokuapp.com/word";
levelEL.value = storge
let randomWord;
let score = 0;
let time = 10;
inputEl.focus()
function getApi() {
  fetch(API)
    .then((data) => {
      return data.json();
    })
    .then(getWord);
}
getApi();

function getWord(word) {
  randomWord = word[0].toLowerCase();
  randomWordEl.textContent = randomWord;
}
inputEl.addEventListener("input", () => {
  if (inputEl.value == randomWord) {
    getApi();
    score++;
    scoreEl.textContent = score;
    inputEl.value = "";
    if (levelEL.value == "easy") {
      time += 7;
    } else if (levelEL.value == "medium") {
      time += 5;
    } else if (levelEL.value == "hard") {
      time += 3;
    }
  }

});

setInterval(() => {
  if (time) {
    time--;
    timeEl.textContent = time;
  } else {
    gameOver();
  }
}, 1000);

function gameOver() {
  scoreLevel.textContent = score;
  bgModal.style.display = "block";
  modal.classList.add("active");
}
againBtn.addEventListener("click",returnGame)
 


levelEL.addEventListener("change", () => {
      localStorage.setItem('levelTying'.JSON.stringifty(levelEL.value))
  returnGame()
});
function returnGame(){
      bgModal.style.display = "none";
      modal.classList.remove("active");
      getApi();
      score = 0;
      scoreEl.textContent = score;
    
      time = 10;
}
