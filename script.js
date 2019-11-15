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


    function enableFlipping() {
        const numberOfMatchedImages = $('.matched').length;
        // returns a number

        if (numberOfMatchedImages % 2 === 0) {
            $('.card').not('.matched, .flipped').children().off('click');
            console.log('ENABLE CLICKING!!!!!!!!');
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


    function compareCards() {
        if (flippedImages.length === 2) {
            if (flippedImages[0] === flippedImages[1]) {
                console.log('true');
                flippedCards[0].addClass('matched');
                flippedCards[1].addClass('matched');
                coinAnimation();
                coinSound();
                clearArrays();
                enableFlipping();
                counter();
                console.log(flippedCards);
            } else {
                console.log('false');
                setTimeout(function () {
                    flippedCards[0].removeClass('flipped');
                    flippedCards[1].removeClass('flipped');
                    clearArrays();
                    enableFlipping();
                    counter();
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