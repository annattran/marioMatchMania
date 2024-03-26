document.addEventListener("DOMContentLoaded", () => {
    // GLOBAL VARIABLES
    const cards = document.querySelectorAll('.card');
    const backgroundMusic = document.getElementById("background");
    const soundButton = document.getElementById("sound");
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

    function createRandomIntegers() {
        while (randomIntegers.length < 6) {
            const randomInt = randomIntFromInterval(1, 3);
            if (countInArray(randomIntegers, randomInt) < 2) {
                randomIntegers.push(randomInt);
            }
        }
    }

    function randomizeCards(card, index) {
        const image = document.createElement('img');

        image.src = `assets/card${randomIntegers[index]}.png`;

        card.querySelector('.front.face').innerText = '';

        card.querySelector('.front.face').append(image);
    }

    // for each item in array 'cards'
    cards.forEach(function (card, index) {

        createRandomIntegers();
        randomizeCards(card, index);

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
                openCongrats(playAgain);
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
            soundButton.classList.toggle('fa-volume-mute');
            soundButton.classList.toggle('fa-volume-up');
            backgroundSound();
        })
    }


    function fireballSound() {
        const fireball = document.getElementById("fireball");
        if (sound.classList.contains('fa-volume-mute')) {
            fireball.pause();
        } else {
            fireball.play();
        }
    }


    function coinSound() {
        const coin = document.getElementById("coin");
        setTimeout(function () {
            if (sound.classList.contains('fa-volume-mute')) {
                coin.pause();
            } else {
                coin.play();
            }
        }, 500);
    }


    function winSound() {
        const win = document.getElementById("win");
        if (sound.classList.contains('fa-volume-mute')) {
            win.pause();
        } else {
            win.play();
        }
    }


    function backgroundSound() {
        backgroundMusic.loop = true;
        if (sound.classList.contains('fa-volume-mute')) {
            backgroundMusic.pause();
        } else {
            backgroundMusic.play();
        }
    }


    function openCongrats(callback) {
        if (matchedCards.length === cards.length) {
            setTimeout(function () {
                document.getElementById('congratsModal').style.display = "block";
            }, 500);
            setTimeout(function () {
                background.pause();
                winSound();
            }, 800);
        }
        callback();
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
        document.querySelector('.playAgain').addEventListener('click', function () {
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


    function playAgain() {
        // on click of playAgain
        document.querySelector('.playAgain').addEventListener('click', function () {
            // reset counter to 0
            document.querySelector('.counter').innerText = 0;
            // remove 'flipped' & 'matched' classes off all cards
            randomIntegers = [];
            cards.forEach(function (card, index) {
                card.classList.remove('flipped', 'matched');
                createRandomIntegers();
                randomizeCards(card, index);
            })
            // reset array of matchedCards
            matchedCards = [];
            // run the following functions
            enableFlipping();
            backgroundSound();
        });
    }


    // FUNCTIONS RUNNED ON DOCUMENT READY
    toggleSound();
    clickQuestionBox();
    openInstructions();
    closeInstructions();

});
