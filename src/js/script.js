//declarando as classes
const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

//chama função inicio do jogo
startGame();
//função que inicia o jogo chamando as cards do game.js
function startGame() {
    initializeCards(game.createCardsFromTechs());
}
// função que vai criar o html das cartas
function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    //limpa o tabuleiro
    gameBoard.innerHTML = '';
    //cria cada card
    game.cards.forEach(card => {
        //define a varavel e cria o elemento div
        let cardElement = document.createElement('div');
        //para cada elemento, adiciona o nome+id gerado
        cardElement.id = card.id;
        //adiciona a classe card para cada elemento
        cardElement.classList.add(CARD);
        //adiciona a info do icone no dataset 
        cardElement.dataset.icon = card.icon;
        //chama a função que cria o conteudo
        createCardContent(card, cardElement);
        //verifica o click e flipa a card
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);


    })
}
//cria o conteudo das cards 
function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}
//cria as faces das cards, sobrepostas para serem flipadas no click
function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./src/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}

//faz o flip das cards
function flipCard() {

    if (game.setCard(this.id)) {
        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 500);
            }
        }
    }

}

function restart() {
    //limpa as cards (desvira)
    game.clearCards();
    //incia o jogo
    startGame();
    //pega o elemento pelo Id
    let gameOverLayer = document.getElementById("gameOver");
    //set o estilo para none
    gameOverLayer.style.display = 'none';
}