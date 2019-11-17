$(document).ready(function () {
    console.log('ready');


    // const cards = $('body').find('li')
    // console.log('object', cards);
    // returns an object


    const cards = document.querySelectorAll('li');
    console.log('node list', cards);
    // returns a node list


    const deck = Array.from(cards);
    console.log('array', deck)
    // converts node list to an array


    let flippedImages = [];
    console.log('array', flippedImages);
    // empty array for flippedImages

    let flippedCards = [];
    console.log('array', flippedCards);

    let matchedCards = [];


    function disableFlipping(callback) {
        const numberOfFlippedImages = $('.flipped').length;
        // returns a number


        if (numberOfFlippedImages % 2 === 0) {
            // do not let anymore cards be flippable
            $('li').children().on('click', false);
            console.log('no more flipping');
        }

        callback();
    }

    const maxMatches = deck.length;

    function enableFlipping() {

        if (matchedCards.length % 2 === 0) {
            $('.card').not('.matched, .flipped').children().off('click');
            console.log('ENABLE CLICKING!!!!!!!!');
            console.log(maxMatches, matchedCards.length);
        }
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
                console.log('true?', flippedImages[0] === flippedImages[1]);
                flippedCards[0].addClass('matched');
                flippedCards[1].addClass('matched');
                coinAnimation();
                coinSound();
                clearArrays();
                enableFlipping();
                counter();
                totalMoves();
                openCongrats();
                closeCongrats();
                // playAgain();
            } else {
                console.log('false?', flippedImages[0] === flippedImages[1]);
                setTimeout(function () {
                    flippedCards[0].removeClass('flipped');
                    flippedCards[1].removeClass('flipped');
                    clearArrays();
                    matchedCards.splice(-2);
                    console.log(flippedCards);
                    console.log(flippedCards[0]);
                    console.log(flippedCards[1]);
                    enableFlipping();
                    counter();
                    totalMoves();
                    console.log(flippedCards);
                }, 1000);
                // 1000 = 1 second
            }
        }
    }

    function coinAnimation() {
        setTimeout(function () {
            $('.matched div.back').html('<img class="coin" src="assets/coin.png">');
        }, 500);
    }

    function cloudAnimation() {
        $('body').append('<img class="single cloud" src="assets/single-cloud.png">');
        $('body').append('<img class="double cloud" src="assets/double-cloud.png">');
    }

    cloudAnimation();


    function fireballSound() {
        const fireball = document.getElementById("fireball");
        fireball.play();
    }

    function coinSound() {
        setTimeout(function () {
            const coin = document.getElementById("coin");
            coin.play();
        }, 500);
    }

    function openCongrats() {
        if (matchedCards.length === maxMatches) {
            setTimeout(function () {
                document.getElementById('congratsModal').style.display = "block";
            }, 500);
        }
    }

    function closeCongrats() {
        $('.close').on('click', function () {
            document.getElementById('congratsModal').style.display = "none";
        });
    }

    function playAgain() {
        $('.playAgain').on('click', function () {
            for (i = 1; i <= deck.length; i++) {

            }
        });
    }

    function randomImg() {
        let randomNumber = Math.floor(Math.random() * (8 - 1)) + 1;
        let imgName = "panda_gif_" + randomNumber + ".gif";
        document.getElementById("imageid").src = "assets" + "/" + imgName;
    }










    // for each card
    cards.forEach(function (card) {
        console.log('card', card);

        // on click
        $(card).on('click', function () {

            // add class of flipped
            card.classList.toggle('flipped');

            fireballSound();

            // make the item unflippable
            $(this).children().on('click', false);

            // log the flipped cards in an array
            flippedImages.push($(this).find('img').attr('src'));
            console.log(flippedImages);

            flippedCards.push($(this));
            console.log(flippedCards);

            matchedCards.push($('body').find('.matched'));
            console.log(matchedCards);




            // let number of flipped cards equal to the number of elements with class 'flipped'
            // const numberOfFlippedImages = $('.flipped').length;


            // if number of flipped cards is greater than or equal to 2 
            // if (numberOfFlippedImages >= 2) {
            //     // do not let anymore cards be flippable
            //     $('li').children().on('click', function () { return false; });
            //     console.log('no more flipping')

            disableFlipping(compareCards);



            // and check if the two cards that are flipped, match
            // compareCards();
        });
    });















    // on click of first image, flip image and stay

    // $('img').on('click', function () {

    // });

    // on click of second image
    // if first image === second image
    // keep images flipped and no longer flippable
    // and increment number of tries


    // if first image !== second image
    // flip back both images
    // and increment number of tries


    // when user matches all the cards
    // prompt congratulations you won in x tries

});