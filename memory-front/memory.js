document.addEventListener('DOMContentLoaded', () => {
// --- SETTING VALUES ---  
        // list of cards 
        const cardArray = [
            {
              name: 'img1',
              img: 'assets/img1.png',
              cardval: 2
            },
            {
              name: '2img1',
              img: 'assets/img1.png',
              cardval: 2
            },
            {
              name: 'img2',
              img: 'assets/img2.png',
              cardval: 3
            },
            {
              name: '2img2',
              img: 'assets/img2.png',
              cardval: 3
            },
    
            {
              name: 'img3',
              img: 'assets/img3.png',
              cardval: 4
            },
            {
              name: '2img3',
              img: 'assets/img3.png',
              cardval: 4
            },
            {
              name: 'img4',
              img: 'assets/img4.png',
              cardval: 5
            },
            {
              name: '2img4',
              img: 'assets/img4.png',
              cardval: 5
            },
    
            {
              name: 'img5',
              img: 'assets/img5.png',
              cardval: 6
            },
            {
              name: '2img5',
              img: 'assets/img5.png',
              cardval: 6
            },
            {
              name: 'img6',
              img: 'assets/img6.png',
              cardval: 7
            },
            {
              name: '2img6',
              img: 'assets/img6.png',
              cardval: 7
            },
            {
              name: 'img7',
              img: 'assets/img7.png',
              cardval: 8
            },
            {
              name: '2img7',
              img: 'assets/img7.png',
              cardval: 8
            },
            {
              name: 'img8',
              img: 'assets/img8.png',
              cardval: 9
            },
            {
              name: '2img8',
              img: 'assets/img8.png',
              cardval: 9
            }
    
          ]

    // cardsPicked and cardsValues will handle the state of cardspicked between functions, both will be an array of 2 values (card1 = [0] and card2 = [1])
    let cardsPicked = []
    let cardsValues = []
    let usr_score = 0
    // will represent the amount of time the player tried to find a pair
    let usr_tries = 0
    // getting name stored in sessionstorage
    const usr_pseudo = sessionStorage.getItem('NAME');
    document.getElementById('username').innerHTML = usr_pseudo;
    // shuffle cards, sort will try to compare each cards which has been given a value of 0.5 to a random number between 0 and 1
    cardArray.sort(() => 0.5 - Math.random())
    // access to the grid where cards will appear 
    const grid = document.querySelector('.grid')
    // chrono variable
    var seconds = 0
    var tempo = []
    

// --- FUNCTIONS --- 

    // display cards on the board
    function displayCards() {
        for (var i = 0; i < cardArray.length; i++) {
          const card = document.createElement('img')
          // hide card
          card.setAttribute('src', 'assets/verso.png')
          // used to change style
          card.setAttribute('class', 'card')
          // used for score
          card.setAttribute('cardId', i)
          // trigger flipping card
          card.setAttribute('cardval', cardArray[i].cardval)
          card.addEventListener('click', flipCard)
          // add card to the grid
          grid.appendChild(card)
        }
        // every 1000 miliseconds chrono_loop will be called
        tempo = setInterval(chrono_loop, 1000);
    }
    
    //flip your card
    function flipCard() {
        // storing picked card, its id for changing its appearance and value for checking pairs
        var cardId = this.getAttribute('cardId')
        var cardVal = this.getAttribute('cardval')
        cardsPicked.push(cardId)
        cardsValues.push(cardVal)

        this.setAttribute('src', cardArray[cardId].img)
        // avoiding double click on the same card
        this.removeEventListener('click', flipCard)

        if (cardsPicked.length === 2) {
        // updating and displaying tries 
        usr_tries +=1
        document.getElementById("tries").innerHTML = ("Tries : " +  usr_tries)
        checkMatchingCards(cardsPicked[0], cardsPicked[1])
        }
    }

    /* 
        Here we check the values of each cards
        if both cards have the same values -> score +1
    */
    function checkMatchingCards(idCard1, idCard2) {
        const cards = document.querySelectorAll('.card')
        var card1 = parseInt(cardsValues[0])
        var card2 = parseInt(cardsValues[1])
        console.log(card1)
        console.log(card2)
        // if there is a pair, score ++ , else cards are fliped back
        if (card1 === card2 ) {
          addingScore(idCard1, idCard2, cards)
        }
        else {
          setBackCards(idCard1, idCard2, cards)
        }
        // we checked cards, so we reset state
        cardsPicked = []
        cardsValues = []
        // we have 16 cards, 8 pairs so score will be full when score will be equal to 8 
        if (usr_score === 8) {
          alert('Congratulations ! ')
          save_score()
        }
    }

    function addingScore(idCard1, idCard2, cards) {
        cards[parseInt(idCard1)].setAttribute('src', 'assets/cardgg.png')
        cards[parseInt(idCard2)].setAttribute('src', 'assets/cardgg.png')
        // dating and displaying score
        usr_score += 1
    
        document.getElementById("score").innerHTML = ("Score : " +  usr_score)
    }
    
    function setBackCards(idCard1, idCard2, cards) {
        // set back cards on initial state (reversed, making them clickable)
        cards[parseInt(idCard1)].addEventListener('click', flipCard)
        cards[parseInt(idCard2)].addEventListener('click', flipCard)
        // in order to have time to see the clicked card we put a delay on the hiding step
        setTimeout(() => {
          cards[parseInt(idCard1)].setAttribute('src', 'assets/verso.png')
        }, 500);
        setTimeout(() => {
          cards[parseInt(idCard2)].setAttribute('src', 'assets/verso.png')
        }, 500);
  
    }
  
    function save_score() {
        // stopping chrono 
        clearInterval(tempo)
    }

    function chrono_loop() {
        seconds += 1;
        document.getElementById("seconds").innerHTML = (seconds + " s");
    }

// --- LAUNCHING GAME --- 
    displayCards()
})
