const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

window.addEventListener('load', () => {
  const memoryGame = new MemoryGame(cards);
  let pickedCards = [];

  let html = '';
  memoryGame.shuffleCards(); 
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  document.querySelector('#memory-board').innerHTML = html;

  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      if (!card.classList.contains('turned') && !card.classList.contains('blocked')) {
        card.classList.toggle('turned');
        pickedCards.push(card);

        if (pickedCards.length === 2) {
          const [card1, card2] = pickedCards;
          const card1Name = card1.dataset.cardName;
          const card2Name = card2.dataset.cardName;

          if (memoryGame.checkIfPair(card1Name, card2Name)) {
            card1.classList.add('blocked');
            card2.classList.add('blocked');
          } else {
            setTimeout(() => {
              card1.classList.remove('turned');
              card2.classList.remove('turned');
            }, 1000);
          }
          pickedCards = [];
          if (memoryGame.checkIfFinished()) {
            alert('You won!!!');
          }
          updateScore();
        }
        updateScoreMarker();
      }
    });
  });

  function updateScore() {
    memoryGame.pairsClicked++;
  }

  function updateScoreMarker() {
    const pairsClickedElement = document.getElementById('pairs-clicked');
    const pairsGuessedElement = document.getElementById('pairs-guessed');

    pairsClickedElement.textContent = memoryGame.pairsClicked;
    pairsGuessedElement.textContent = memoryGame.pairsGuessed;

    const marker = document.getElementById('score-marker');
    const totalPairs = cards.length / 2;
    const markerPosition = (memoryGame.pairsGuessed / totalPairs) * 100;
    marker.style.width = `${markerPosition}%`;
  }
});











