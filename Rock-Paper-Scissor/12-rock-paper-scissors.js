let score = JSON.parse(localStorage.getItem('score'));
if (score === null /*or !score*/) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
}
// so when we refresh the page the score won't be lost. 
updateScoreElement();

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            selectMove(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;

    }
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        selectMove('rock');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        selectMove('scissors');
    });
document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        selectMove('paper');
    });

document.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        selectMove('rock');
    } else if (event.key === 's') {
        selectMove('scissors');
    } else if (event.key === 'p') {
        selectMove('paper');
    }
})


function selectMove(param1) {
    const computerMove = pickComputerMove();
    let result = '';
    if (param1 === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose';
        } else if (computerMove === 'paper') {
            result = 'You win';
        } else if (computerMove === 'scissors') {
            result = 'Tie';
        }

    } else if (param1 === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win';
        } else if (computerMove === 'paper') {
            result = 'Tie';
        } else if (computerMove === 'scissors') {
            result = 'You lose';
        }

    } else if (param1 == 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        } else if (computerMove === 'paper') {
            result = 'You lose';
        } else if (computerMove === 'scissors') {
            result = 'You win';
        }
    }
    if (result === 'You win') {
        score.wins += 1;
    } else if (result === 'You lose') {
        score.losses += 1;
    } else {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    //localstorage stores data in the form of key-value pairs, here key is 'score' and value is (score) which is stored as a string 
    // via JSON.stringify(score) as localstorage only stores strings.

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You
                <img src="Images/${param1}-emoji.png" class="move-icon">
                <img src="Images/${computerMove}-emoji.png" class="move-icon">
                Computer`;


    // alert(`You picked ${param1}. Computer picked ${computerMove}, ${result} \nWins:${score.wins} , Losses: ${score.losses}, Ties: ${score.ties}`);
}
function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins} , Losses: ${score.losses}, Ties: ${score.ties}`;
}
function pickComputerMove() {
    let computerMove = '';
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }
    return computerMove;
}