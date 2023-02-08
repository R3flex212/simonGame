//Variables
let start = false;
let playerArr = [];
let gameArr = [];
let lvl = 0;
let currentLvl = 0;

let title = document.querySelector("h1"); //Select and add event listner to the title to start the game
title.addEventListener("click", () => {
  if (!start) {
    if (window.matchMedia("(max-width: 800px)").matches){
      title.classList.toggle("gameOver");
    }
    startGame();
  }
});

function rndmBox() {
  //generate a random button choice [g,r,y,b] associated to a random integer
  let nr = Math.floor(Math.random() * 4 + 1);
  switch (nr) {
    case 1:
      return "g";
      break;
    case 2:
      return "r";
      break;
    case 3:
      return "y";
      break;
    case 4:
      return "b";
      break;
  }
}

function animateBtn(btn) {
  //animation on call with switch statements to change the clr of the buttonn
  //https://stackoverflow.com/questions/21032481/change-the-style-of-before-and-after-pseudo-elements <- STACK OVERFLOW SOLUTION
  let selectedBtn = document.querySelector(`.${btn}`);
  var styleElem = document.head.appendChild(document.createElement("style"));
  var style1Elem = document.head.appendChild(document.createElement("style"));
  var style2Elem = document.head.appendChild(document.createElement("style"));
  let clr = btn;
  switch (btn) {
    case "y":
      clr = "yellow";
      break;
    case "b":
      clr = "blue";
      break;
    case "r":
      clr = "red";
      break;
    case "g":
      clr = "green";
      break;
  }
  styleElem.innerHTML = `#${btn}:before {background: ${clr};}`;
  style1Elem.innerHTML = `#${btn}:after {background: ${clr};}`;
  style2Elem.innerHTML = `#${btn} {background: ${clr};}`;
  setTimeout(() => {
    styleElem.innerHTML = `#${btn}:before {background: #2d4c6b;}`;
    style1Elem.innerHTML = `#${btn}:after {background: #2d4c6b;}`;
    style2Elem.innerHTML = `#${btn} {background: #2d4c6b;}`;
  }, 800);
}

//Play audio on call
function playAudio(btn) {
  let audio = new Audio(`sounds/${btn}.mp3`);
  audio.play();
}

//Generate a random button/box and animate it/ play the correct audio
function createBox() {
  let box = rndmBox();
  gameArr.push(box);
  animateBtn(box);
  playAudio(`${box}`);
}

//start game -> reset vars/set start to true/change lvl title
function startGame() {
  document.querySelectorAll("audio").forEach((el) => el.pause());
  start = true;
  gameArr = [];
  playerArr = [];
  lvl = 0;
  currentLvl = 0;
  createBox();
  // console.log("start!@");
  // logArray();
  title.innerHTML = lvl;
}

//Detect gameover/chnage title/play sound/reset vars
function gameOver() {
  playAudio("sad");
  start = false;
  title.innerHTML = "Game Over! Press HERE to try again";
  if (window.matchMedia("(min-width: 800px)").matches) {
    title.style.fontSize = "3rem";
    title.style.width = "800px";
  } else {
    title.classList.toggle("gameOver");
  }

  // alert("GAME OVER!");
  playerArr = [];
  gameArr = [];
  lvl = 0;
  currentLvl = 0;
  // logArray();
}

//Debug
function logArray() {
  console.log("player " + playerArr);
  console.log("game " + gameArr);
  console.log("CURRENT LVL: " + currentLvl);
  console.log("LVL " + lvl);
}

//Check for the players move if the currentLvl !== lvl (this means it shows another box)
function check() {
  logArray();
  if (gameArr[currentLvl] === playerArr[currentLvl]) {
    //check both arrays for the currentLvl pos
    currentLvl++;
  } else {
    gameOver();
    start = false;
  }
}

//Main loop that checks for clicks using event listener instead of loops -> works on every click on a button when start=true
//it constantly updates currentLvl and lvl based on the players moves
let btnArray = document.querySelectorAll(".btn");
btnArray.forEach((e) => {
  e.addEventListener("click", () => {
    playAudio(e.textContent.toLocaleLowerCase()); //audio on click
    if (start) {
      playerArr.push(e.textContent.toLocaleLowerCase().replace(/\s+/g, "")); //log players move
      // logArray();
      if (currentLvl === lvl) {
        //check for the first time the game is started to make sure it works and checks the arrays first time
        check();
        lvl++; //if currentLvl===lvl this means player completed all moves in the array and you can increase lvl and show another box
        currentLvl = 0; //reset variables
        playerArr = [];
        if (start) {
          title.innerHTML = lvl; //update title
        }
        setTimeout(() => {
          //create a new box with a 1s delay
          if (start) {
            createBox();
          }
        }, 1000);
      } else {
        //if it's not time to show a new box then check for every players move until currentLvl===lvl
        check();
        // console.log("checking!");
      }
    }
  });
});

function animateArrow() {
  // Returns a Promise that resolves after "ms" Milliseconds
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  const img = document.querySelector("img");
  async function load() {
    // We need to wrap the loop into an async function for this to work
    while (true) {
      img.style.bottom = "20px";
      await timer(800); // then the created Promise can be awaited
      img.style.bottom = "5px";
      await timer(800); // then the created Promise can be awaited
    }
  }
  load();
}

animateArrow();
