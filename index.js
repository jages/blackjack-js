let deck = []; //🃃
shuffleDeck();
let playerCards = [];
let dealerCards = [];

const dealerToken = 'DEALER';
const playerToken = 'PLAYER';

const cardBPstart = '<div class="card-container dynamic-card"><div class="card"><span class="card-icon '
const cardBPmid = '">';
const cardBPend = '</span></div></div>';


//game logic
function initGame() {
    clearArea();
    shuffleDeck();
    drawCard(dealerToken);
}

function shuffleDeck() {
    deck = [];
    let suits = ['♦', '♥', '♠', '♣'];
    for (let k = 0; k < 6; k++) { //in the real world, Blackjack is usually played with 312 cards => 6 full decks
        for (let j = 0; j < suits.length; j++) {
            for (let i = 1; i <= 13; i++) {
                deck.push({
                    num: i,
                    suit: suits[j]
                });
            }
        }
    }
}

function drawCard(player) {
    let card = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
    console.log(card);
    player == dealerToken ? dealerCards.push(card) : playerCards.push(card);

    addCardToPlayArea(player, card);
}

//visual helpers
function getFaceDescription(i){
    switch(i){
        case 1: return 'A';
        case 11: return 'J';
        case 12: return 'Q';
        case 13: return 'K';
        default: return ''+i;
    }
}



// dom manipulation
function clearArea(){
    let cards = document.querySelectorAll('.dynamic-card');
    cards.forEach(card => card.remove());
}

function addCardToPlayArea(player, card){
    let playArea = player == dealerToken ? document.querySelector('.dealer-cards') : document.querySelector('.player-cards');
    let colorClass = card.suit =='♦' || card.suit == '♥' ? 'red' : 'black';
    let cardHTML = cardBPstart + colorClass + cardBPmid + getFaceDescription(card.num) + card.suit + cardBPend;
    playArea.innerHTML += cardHTML;
}

//event handlers
//document.querySelector('.card-stack').addEventListener('click', function(){console.log('got clicked')});
document.addEventListener('keydown', function(sender){
    if(sender.key === 'a'){
        drawCard(dealerToken);
    } else if(sender.key === 'd'){
        drawCard(playerToken);
    } else if(sender.key === 'x'){
        initGame();
    } else if(sender.key === 'y'){
        clearArea();
    }
});