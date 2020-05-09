var deck = []; //🃃
shuffleDeck();
var playerCards = [];
var dealerCards = [];

const dealerToken = 'DEALER';
const playerToken = 'PLAYER';

const cardBPstart = '<div class="card"><span class="card-icon '
const cardBPmid = '">';
const cardBPend = '</span></div>';


//game logic
function initGame() {
    clearArea();
    shuffleDeck();
    drawCard(dealerToken);
}

function shuffleDeck() {
    deck = [];
    var suits = ['♦', '♥', '♠', '♣'];
    for (var k = 0; k < 6; k++) { //in the real world, Blackjack is usually played with 312 cards => 6 full decks
        for (var j = 0; j < suits.length; j++) {
            for (var i = 1; i <= 13; i++) {
                deck.push({
                    num: i,
                    suit: suits[j]
                });
            }
        }
    }
}

function drawCard(player) {
    var card = deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
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
    var cards = document.querySelectorAll('.card');
    cards.forEach(card => card.remove());
}

function addCardToPlayArea(player, card){
    var playArea = player == dealerToken ? document.querySelector('.dealer-cards') : document.querySelector('.player-cards');
    var colorClass = card.suit =='♦' || card.suit == '♥' ? 'red' : 'black';
    var cardHTML = cardBPstart + colorClass + cardBPmid + getFaceDescription(card.num) + card.suit + cardBPend;
    playArea.innerHTML += cardHTML;
}

//event handlers
document.querySelector('.card-stack').addEventListener('click', initGame);
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