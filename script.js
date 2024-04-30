document.addEventListener("DOMContentLoaded", () => {
    // GLOBAL VARIABLES
    let cards;
    level = 1;
    let levelObject = {
        1: 6,
        2: 8,
        3: 12,
        4: 16
    };
    const backgroundMusic = document.getElementById("background");
    const soundButton = document.getElementById("sound");
    const fireball = document.getElementById("fireball");
    const coin = document.getElementById("coin");
    const win = document.getElementById("win");
    let randomIntegers = []; // to contain integers that have been generated randomly
    let flippedCards = []; // to contain cards that are flipped
    let matchedCards = []; // to contain cards that are matched
    let flippedImages = []; // to contain img names that are flipped


    // FUNCTIONS --------------------------------------------------------------
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function countInArray(array, what) {
        return array.filter(item => item == what).length;
    }

    function createRandomIntegers(quantity) {
        randomIntegers = [];
        while (randomIntegers.length < quantity) {
            const randomInt = randomIntFromInterval(1, quantity / 2);
            if (countInArray(randomIntegers, randomInt) < 2) {
                randomIntegers.push(randomInt);
            }
        }
    }

    function createCards() {
        createRandomIntegers(levelObject[level]);
        document.querySelector('.container').innerText = '';
        for (let i = 0; i < randomIntegers.length; i++) {
            const card = document.createElement('li');
            card.classList.add('card');
            document.querySelector('.container').append(card);

            const front = document.createElement('div');
            front.classList.add('front', 'face');
            card.append(front);

            const back = document.createElement('div');
            back.classList.add('back', 'face');
            card.append(back);

            const image = document.createElement('img');
            image.src = `assets/card${randomIntegers[i]}.png`;
            card.querySelector('.front.face').append(image);
        }

        cards = document.querySelectorAll('.card')

        // for each item in array 'cards'
        cards.forEach(function (card, index) {

            // additionally, on the click of each item
            card.addEventListener('click', () => {
                // add class of flipped
                card.classList.toggle('flipped');
                // run fireballSound
                fireballSound();
                // make the item unflippable
                card.style.pointerEvents = 'none';
                // log this card as flipped
                flippedCards.push(card);
                // log the card's img name as flipped
                flippedImages.push(card.querySelector('img').src);
                // look for elements with the class of 'matched'
                // and push into matchedCards array
                matchedCards.push(document.querySelectorAll('.matched'));
                // run disableFlipping and compareCards
                disableFlipping(compareCards);
            });
        });
    }


    function disableFlipping(callback) {
        if (flippedImages.length % 2 === 0) {
            // if number of flipped images is perfectly divisible by 2
            cards.forEach(function (card) {
                card.style.pointerEvents = 'none';
            })
            // do not let anymore cards be flippable
        }
        callback();
    }


    function enableFlipping() {
        const unmatchedCards = document.querySelectorAll('.card:not(.matched)');
        // enable flipping on cards except cards with the class of 'matched'
        unmatchedCards.forEach(function (card) {
            card.style.pointerEvents = 'auto';
        })
    }


    function clearArrays() {
        flippedCards = [];
        flippedImages = [];
    }


    function counter() {
        let counter = parseInt(document.querySelector('.counter').innerText);
        document.querySelector('.counter').innerText = counter + 1;
    }


    function totalMoves() {
        document.querySelector('.totalMoves').innerText = document.querySelector('.counter').innerText;
    }


    function compareCards() {
        if (flippedImages.length === 2) {
            if (flippedImages[0] === flippedImages[1]) {
                flippedCards[0].classList.add('matched');
                flippedCards[1].classList.add('matched');
                coinAnimation();
                coinSound();
                clearArrays();
                enableFlipping();
                counter();
                totalMoves();
                openCongrats();
                closeCongrats();
            } else {
                setTimeout(function () {
                    flippedCards[0].classList.remove('flipped');
                    flippedCards[1].classList.remove('flipped');
                    clearArrays();
                    matchedCards.splice(-2);
                    enableFlipping();
                    counter();
                    totalMoves();
                }, 1000);
            }
        }
    }


    function coinAnimation() {
        const matchedCards = document.querySelectorAll('.matched .front');
        setTimeout(function () {
            matchedCards.forEach(function (card) {
                const coin = document.createElement('img');
                coin.classList.add('coin');
                coin.src = 'assets/coin.png';
                card.append(coin);
            })
        }, 500);
    }


    function toggleSound() {
        soundButton.addEventListener('click', function () {
            soundButton.querySelector('i').classList.toggle('fa-volume-mute');
            soundButton.querySelector('i').classList.toggle('fa-volume-up');
            backgroundSound();
            fireball.pause();
            coin.pause();
            win.pause();
        })
    }


    function fireballSound() {
        if (soundButton.querySelector('i').classList.contains('fa-volume-mute')) {
            fireball.pause();
        } else {
            fireball.play();
        }
    }


    function coinSound() {
        setTimeout(function () {
            if (soundButton.querySelector('i').classList.contains('fa-volume-mute')) {
                coin.pause();
            } else {
                coin.play();
            }
        }, 500);
    }


    function winSound() {
        if (soundButton.querySelector('i').classList.contains('fa-volume-mute')) {
            win.pause();
        } else {
            win.play();
        }
    }


    function backgroundSound() {
        backgroundMusic.loop = true;
        if (soundButton.querySelector('i').classList.contains('fa-volume-mute')) {
            backgroundMusic.pause();
        } else {
            backgroundMusic.play();
        }
    }


    function openCongrats() {
        if (matchedCards.length === cards.length) {
            if (level === Object.keys(levelObject).length) {
                document.querySelector('#congratsModal h2').innerText = 'Congratulations! You completed the last level.';
                document.querySelector('#congratsModal .buttonContainer').remove();
            }
            setTimeout(function () {
                document.getElementById('congratsModal').style.display = "block";
            }, 500);
            setTimeout(function () {
                background.pause();
                winSound();
            }, 800);
        }
    }


    function clickQuestionBox() {
        document.querySelector('.question').addEventListener('click', function () {
            openInstructions();
        });
    }


    function closeCongrats() {
        document.querySelector('.congrats .close').addEventListener('click', function () {
            document.getElementById('congratsModal').style.display = "none";
        });
    }


    function openInstructions() {
        document.getElementById('instructionsModal').style.display = "block";
    }


    function closeInstructions() {
        document.querySelector('.instructions .close').addEventListener('click', function () {
            document.getElementById('instructionsModal').style.display = "none";
        });
        document.querySelector('.ready').addEventListener('click', function () {
            document.getElementById('instructionsModal').style.display = "none";
        });
    }

    function newGame() {
        document.getElementById('congratsModal').style.display = "none";
        // reset counter to 0
        document.querySelector('.counter').innerText = 0;
        // create new cards
        createCards();
        // reset array of matchedCards
        matchedCards = [];
        // run the following functions
        enableFlipping();
        win.pause();
        backgroundSound();
    }


    function nextLevel() {
        // on click of nextLevel
        document.querySelector('.nextLevel').addEventListener('click', function () {
            if (level < Object.keys(levelObject).length) {
                level++;
                const levelCount = parseInt(document.querySelector('.level').innerText);
                document.querySelector('.level').innerText = levelCount + 1;
                document.querySelector('.container').classList.remove('col-4');
                if (levelObject[level] % 4 === 0) {
                    document.querySelector('.container').classList.add('col-4');
                    if (level == 4) {
                        document.querySelector('.container').classList.add('last-level');
                    }
                }
            }
            newGame();
        });
    }


    function playAgain() {
        // on click of playAgain
        document.querySelector('.playAgain').addEventListener('click', function () {
            newGame();
        });
    }


    // FUNCTIONS RUNNED ON DOCUMENT READY
    createCards();
    toggleSound();
    clickQuestionBox();
    openInstructions();
    closeInstructions();
    nextLevel();
    playAgain();
});
