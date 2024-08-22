const titleEl = document.getElementById('level-title');
const buttons = document.querySelectorAll('.btn');

const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let isGameStarted = false;
let level = 0;

function nextSequence() {
  level++;
  titleEl.textContent = `Level ${level}`;

  // add random colour to 'gamePattern'
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

function playSound(name) {
  const sound = new Audio(`./sounds/${name}.mp3`);
  sound.play();
}

buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

function handleButtonClick(ev) {
  if (!isGameStarted) {
    return;
  }

  // add the colour which the user clicked to 'userClickedPattern'
  const userChosenColour = ev.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  const isClickCorrect = checkAnswer();
  if (!isClickCorrect) {
    gameOver();
  } else if (isClickCorrect && gamePattern.length === userClickedPattern.length) {
    setTimeout(() => {
      nextSequence();
      userClickedPattern = [];
    }, 500);
  }
}

function animatePress(currentColour) {
  const currentBtn = document.getElementById(currentColour);
  currentBtn.classList.add('pressed');
  setTimeout(() => {
    currentBtn.classList.remove('pressed');
  }, 100);
}

document.addEventListener('keydown', ev => {
  if (isGameStarted) {
    return;
  }

  isGameStarted = true;
  nextSequence();
});

function checkAnswer() {
  for (let i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      return false;
    }
  }
  return true;
}

function gameOver() {
  playSound('wrong');
  document.body.classList.add('game-over');
  setTimeout(() => {
    document.body.classList.remove('game-over');
  }, 200);
  gamePattern = [];
  userClickedPattern = [];
  isGameStarted = false;
  level = 0;
  titleEl.textContent = 'Press A Key to Start';
}
