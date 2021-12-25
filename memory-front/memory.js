document.addEventListener('DOMContentLoaded', () => {
// --- SETTING VALUES ---  
        // list of cards 
        const cardArray = [
            {
              name: 'img1',
              img: 'assets/img1.png',
              cardval: 11
            },
            {
              name: '2img1',
              img: 'assets/img1.png',
              cardval: 9
            },
            {
              name: 'img2',
              img: 'assets/img2.png',
              cardval: 18
            },
            {
              name: '2img2',
              img: 'assets/img2.png',
              cardval: 2
            },
    
            {
              name: 'img3',
              img: 'assets/img3.png',
              cardval: 17
            },
            {
              name: '2img3',
              img: 'assets/img3.png',
              cardval: 3
            },
            {
              name: 'img4',
              img: 'assets/img4.png',
              cardval: 16
            },
            {
              name: '2img4',
              img: 'assets/img4.png',
              cardval: 4
            },
    
            {
              name: 'img5',
              img: 'assets/img5.png',
              cardval: 15
            },
            {
              name: '2img5',
              img: 'assets/img5.png',
              cardval: 5
            },
            {
              name: 'img6',
              img: 'assets/img6.png',
              cardval: 14
            },
            {
              name: '2img6',
              img: 'assets/img6.png',
              cardval: 6
            },
            {
              name: 'img7',
              img: 'assets/img7.png',
              cardval: 13
            },
            {
              name: '2img7',
              img: 'assets/img7.png',
              cardval: 7
            },
            {
              name: 'img8',
              img: 'assets/img8.png',
              cardval: 12
            },
            {
              name: '2img8',
              img: 'assets/img8.png',
              cardval: 8
            }
    
          ]

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

    function chrono_loop() {
        seconds += 1;
        document.getElementById("seconds").innerHTML = (seconds + " s");
  
    }


// --- LAUNCHING GAME --- 
    displayCards()
})
