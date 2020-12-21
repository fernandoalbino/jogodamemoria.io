let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,
    clicks: 0,

    //array das imagens que serão usadas no jogo
    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],
    cards: null,


    //metodo
    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

//verifica 
    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        //incrementa após o segundo click
        this.clicks++;
        // console.log(this.clicks);
        //Adiciona o valor do click 1 a 1 
        document.getElementById("countBox").innerHTML = `${this.clicks}`;
        document.getElementById("totalClicks").innerHTML = `Você precisou de ${this.clicks} jogadas para ganhar`;
        //Verifica se o primeiro é igual ao segundo
        return this.firstCard.icon === this.secondCard.icon;
    },


    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    //   retorna verdadeiro quando todas as cartas forem flipadas.
    checkGameOver() {
        //verificar as cartas não flipadas e caso seja = a 0 (zero) o jogo finaliza
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    //cria as cartas com as techs
    createCardsFromTechs: function () {

        this.cards = [];
        //para cada tech chama a função que cria o par de cards
        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        })
        //cria os pares
        this.cards = this.cards.flatMap(pair => pair);
        //chama a função que embaralha as cards para os pares ficarem separados
        this.shuffleCards();
        return this.cards;
    },
    //cria os pares 
    createPairFromTech: function (tech) {
        //retorna os cards cada um id diferente para cada par de card
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]
    },
    //cria os ids randomicos para cada card
    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },
    //embaralha as cartas, os pares saem separados enbaralhodos entre todos os cards
    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;
            //Embaralha pegando o ultimo elemento e certifica que não vamos embaralhar elementos que já embaralhados.
        while (currentIndex !== 0) {
            //calcula o valor randomico entre a ultima posição e o index atual 
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            //inverte a posição de cada card, entre o index atual e o randomico
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]

        }
    },
}