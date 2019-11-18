$(document).ready(function () {
    const cards = Array.from($('body').find('li'));
    // initial return is an object
    // Array.from converts the object to an array


    // GLOBAL VARIABLES
    const cardImages = []; // to contain img names of all cards
    const backgroundMusic = document.getElementById("background");
    const soundButton = document.getElementById("sound");
    let flippedCards = []; // to contain cards that are flipped
    let matchedCards = []; // to contain cards that are matched
    let flippedImages = []; // to contain img names that are flipped


    // FUNCTIONS --------------------------------------------------------------
    // prevent ghost images from being dragged
    $('li').on('dragstart', function (event) {
        event.preventDefault();
    });


    // for each item in array 'cards'
    cards.forEach(function (card) {
        // find the img name of the item and push into cardImages array
        cardImages.push($(card).find('img').attr('src'));

        // and add alt tags to the images with the specified attribute
        $('img[src="assets/card1.png"]').attr('alt', 'Mario character from Mario franchise');
        $('img[src="assets/card2.png"]').attr('alt', 'Red and white mushroom from Mario franchise');
        $('img[src="assets/card3.png"]').attr('alt', 'Bowsy character from Mario franchise');

        // additionally, on the click of each item
        $(card).on('click', function () {
            // add class of flipped
            card.classList.toggle('flipped');
            // run fireballSound
            fireballSound();
            // make the item unflippable
            $(this).children().on('click', false);
            // log this card as flipped
            flippedCards.push($(this));
            // log the card's img name as flipped
            flippedImages.push($(this).find('img').attr('src'));
            // look for elements with the class of 'matched'
            // and push into matchedCards array
            matchedCards.push($('.matched'));
            // run disableFlipping and compareCards
            disableFlipping(compareCards);
        });
    });


    function disableFlipping(callback) {
        if (flippedImages.length % 2 === 0) {
            // if number of flipped images is perfectly divisible by 2
            $('li').children().on('click', false);
            // do not let anymore cards be flippable
        }
        callback();
    }


    function enableFlipping() {
        $('li').not('.matched').children().off('click');
        // enable flipping on cards except cards with the class of 'matched'
    }


    function clearArrays() {
        flippedCards = [];
        flippedImages = [];
    }


    function counter() {
        let counter = parseInt($('.counter').text());
        $('.counter').text(counter + 1);
    }


    function totalMoves() {
        let totalMoves = $('.totalMoves').text($('.counter').text());
    }


    function compareCards() {
        if (flippedImages.length === 2) {
            if (flippedImages[0] === flippedImages[1]) {
                flippedCards[0].addClass('matched');
                flippedCards[1].addClass('matched');
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
                    flippedCards[0].removeClass('flipped');
                    flippedCards[1].removeClass('flipped');
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
        setTimeout(function () {
            $('.matched .back').html('<img class="coin" src="assets/coin.png">');
            // insert html inside elements with the class of 'back' and has a parent with class of 'matched'
        }, 500);
    }

    function cloudAnimation() {
        $('body').append('<img class="single cloud" src="assets/singleCloud.png">');
        $('body').append('<img class="double cloud" src="assets/doubleCloud.png">');
    }


    function toggleSound() {
        $(soundButton).on('click', function () {
            $(soundButton).toggleClass('fa-volume-mute fa-volume-up');
            backgroundSound();
        })
    }


    function fireballSound() {
        const fireball = document.getElementById("fireball");
        if ($(sound).hasClass('fa-volume-mute')) {
            fireball.pause();
        } else {
            fireball.play();
        }
    }


    function coinSound() {
        const coin = document.getElementById("coin");
        setTimeout(function () {
            if ($(sound).hasClass('fa-volume-mute')) {
                coin.pause();
            } else {
                coin.play();
            }
        }, 500);
    }


    function winSound() {
        const win = document.getElementById("win");
        if ($(sound).hasClass('fa-volume-mute')) {
            win.pause();
        } else {
            win.play();
        }
    }


    function backgroundSound() {
        backgroundMusic.loop = true;
        if ($(sound).hasClass('fa-volume-mute')) {
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
        $('.question').on('click', function () {
            openInstructions();
        });
    }


    function closeCongrats() {
        $('.congrats .close, .playAgain').on('click', function () {
            document.getElementById('congratsModal').style.display = "none";
        });
    }


    function openInstructions() {
        document.getElementById('instructionsModal').style.display = "block";
    }


    function closeInstructions() {
        $('.instructions .close, .ready').on('click', function () {
            document.getElementById('instructionsModal').style.display = "none";
        });
    }


    function playAgain() {
        // on click of playAgain
        $('.playAgain').on('click', function () {
            // reset counter to 0
            $('.counter').text(0);
            // remove 'flipped' & 'matched' classes off all cards
            $('li').removeClass('flipped matched');
            // reset array of matchedCards
            matchedCards = [];
            // run the following functions
            enableFlipping();
            backgroundSound();
            shuffle(cardImages);
            displayShuffle();
        });
    }


    // Fisher-Yates (aka Knuth) Shuffle. (NOT MY CODE).
    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex = currentIndex - 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }


    function displayShuffle() {
        const shuffledCards = shuffle(cardImages);
        for (i = 0; i < shuffledCards.length; i++) {
            let newImage = `<img src="${shuffledCards[i]}">`
            $(`.front.${i}`).html(newImage);
        }
    }


    // FUNCTIONS RUNNED ON DOCUMENT READY
    cloudAnimation();
    toggleSound();
    clickQuestionBox();
    openInstructions();
    closeInstructions();

});