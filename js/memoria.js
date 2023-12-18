const elements = [
    {
        element: 'W3C',
        source: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg'
    },
    {
        element: 'HTML5',
        source: 'https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg'
    },
    {
        element: 'CSS3',
        source: 'https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg'
    },
    {
        element: 'JS',
        source: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg'
    },
    {
        element: 'PHP',
        source: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg'
    },
    {
        element: 'SVG',
        source: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg'
    }
];


class Cartas {

    constructor() {
        this.baraja = [];
        this.firstCart = null;
        this.secondCart = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
        for (const carta of elements) {
            this.baraja.push(carta);
            this.baraja.push(carta);
        }
        this.shuffleElements();
        window.addEventListener('load', this.CreateElements.bind(this));
    }

    shuffleElements(){
        this.baraja.sort((a,b) => Math.random() - 0.5);
    }

    CreateElements() {
        const section = document.querySelector('section');
        for (const carta of this.baraja) {
            const articleCarta = document.createElement('article');
            articleCarta.setAttribute('data-state', 'init');
            articleCarta.addEventListener('click', this.unflipCards.bind(this, articleCarta));
            const pReverso = document.createElement('p');
            pReverso.innerText = 'Memory Card';
            const imgAnverso = document.createElement('img');
            imgAnverso.setAttribute('src', carta.source);
            articleCarta.append(pReverso);
            articleCarta.append(imgAnverso);
            section.append(articleCarta);
            //document.createElement()
        }
    }



    unflipCards(articleCarta) {
        articleCarta.setAttribute('data-state', 'flip');
        if (this.firstCart == null) {
            this.firstCart = articleCarta;
        }
        else {
            this.secondCart = articleCarta;
            this.checkForMatch();
        }
    }

    checkForMatch(){
        const img1 = this.firstCart.querySelector('img').getAttribute('src');
            const img2 = this.secondCart.querySelector('img').getAttribute('src');
            if (img1 != img2) {
                setTimeout(this.hide.bind(this), 1000);
                
            }else{
                this.disableCards();
                
            }
    }
    disableCards(){
        this.firstCart.setAttribute('data-state', 'revealed');
        this.secondCart.setAttribute('data-state', 'revealed');
        this.resetBoard();
    }
    resetBoard(){
        this.firstCart = null;
        this.secondCart = null;
        this.hasFlippedCard= false;
        this.lockBoard= false;
    }

    hide() {
        this.firstCart.setAttribute('data-state', 'init');
        this.secondCart.setAttribute('data-state', 'init');
        this.firstCart = null;
        this.secondCart = null;
    }

}

new Cartas();