var cardNames = ["2","3","4","5","6","7","8","9","10","J","K","Q","A"];
var cardSuits = ["C","D","H","S"];
var fullDeck = [];
var card;
cardNum = 1;
var player1ActiveCards = [];
var player2ActiveCards = [];
var gamePlayArray = [];
var player1DealtCards = [];
var player2DealtCards = [];
var cardCounter = 0;

var Card = function(newName, newSuit) {
	this.name = newName;
	this.suit = newSuit;
}

var addCard= function(newName, newSuit) {
	//Add a card to the fullDeck
	card = new Card(newName, newSuit);
	fullDeck[fullDeck.length] = card;
}

var createDeck = function() {
	for(var i=0; i<cardNames.length; i++) {
		console.log("cardNames length: " + cardNames.length);
		for(var x=0; x<cardSuits.length; x++) {
			console.log("cardSuits length: " + cardSuits.length);
				addCard(cardNames[i],cardSuits[x]);
		}
	}
}

var shuffleDeck = function(cardArray) {
	for (var i=cardArray.length-1; i>0; i--) { 
	    cardToSwap = Math.floor(Math.random() * i);
	    temp = fullDeck[i];
	    cardArray[i] = cardArray[cardToSwap];
	    cardArray[cardToSwap] = temp;
	}
}

var dealToPlayers = function() {
	for (var i=0; i<fullDeck.length; i++) {
		if(cardNum % 2 === 0) {
			player1ActiveCards[player1ActiveCards.length] = fullDeck[i];
			cardNum++;
		} else {
			player2ActiveCards[player2ActiveCards.length] = fullDeck[i];
			cardNum++;
		}
	}
}

var playHand = function() {
	gamePlayArray[cardCounter] = player1ActiveCards.shift();
	cardCounter++;
	gamePlayArray[cardCounter] = player2ActiveCards.shift();
	cardCounter++;
}

$(document).ready(function() {
	console.log("javascript works!");
	createDeck();
	shuffleDeck(fullDeck);
	dealToPlayers();
	playHand();
	console.log(gamePlayArray);

	// console.log("Player 1: ");
	console.log("array 1 length: " + player1ActiveCards.length);
	// console.log(player1ActiveCards);
	// console.log("Player 2: ");
	console.log("array 2 length: " + player2ActiveCards.length);
	// console.log(player2ActiveCards);

});

