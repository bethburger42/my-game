var cardNames = ["2","3","4","5","6","7","8","9","10","J","K","Q","A"];
var cardSuits = ["C","D","H","S"];
var fullDeck = [];
var rating = 0;
var card;
cardNum = 1;
var player1ActiveCards = [];
var player2ActiveCards = [];
var gamePlayArray = [];
var player1PlayedCards = [];
var player2PlayedCards = [];
var cardCounter = 0;

var Card = function(newName, newSuit, newRating) {
	this.name = newName;
	this.suit = newSuit;
	this.rating = newRating;
}

var addCard= function(newName, newSuit, newRating) {
	//Add a card to the fullDeck
	card = new Card(newName, newSuit, newRating);
	fullDeck[fullDeck.length] = card;
}

var createDeck = function() {
	for(var x=0; x<cardSuits.length; x++) {	
		console.log("cardSuits length: " + cardSuits.length);
	for(var i=0; i<cardNames.length; i++) {
		console.log("cardNames length: " + cardNames.length);
		rating = i + 1;
		addCard(cardNames[i],cardSuits[x],rating);
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


// var testForWin = function() {
// 	if(player1PlayedCards.length === 52) {
// 		alert("Player 1 has all the cards. Player 1 WINS!!!");
// 	} else if(player2PlayedCards.length === 52){
// 		alert("Player 2 has all the cards. Player 2 WINS!!!");
// 	}
// }

var playHand = function() {
	if(player1ActiveCards[0].rating > player2ActiveCards[0].rating) {
		console.log("player 1 card " + player1ActiveCards[0].rating + " wins over: " + player2ActiveCards[0].rating);
		// player1PlayedCards.push(player1ActiveCards[0]);
		// player1PlayedCards.push(player2ActiveCards[0]);
		// testForWin();
	} else if(player1ActiveCards[0].rating < player2ActiveCards[0].rating) {
		console.log("player 2 card " + player2ActiveCards[0].rating + " wins over: " + player1ActiveCards[0].rating);
		// player2PlayedCards.push(player1ActiveCards[0]);
		// player2PlayedCards.push(player2ActiveCards[0]);
		// testForWin();
	} else if(player1ActiveCards[0].rating === player2ActiveCards[0].rating) {
			alert("It's a WAR!");
			// gamePlayArray[cardCounter] = player1ActiveCards.shift();
			// cardCounter++;
			// gamePlayArray[cardCounter] = player2ActiveCards.shift();
			// cardCounter++;
	}

}

$(document).ready(function() {
	console.log("javascript works!");
	createDeck();
	shuffleDeck(fullDeck);
	dealToPlayers();
	playHand();
	// console.log(gamePlayArray);

	// console.log("Player 1: ");
	console.log("array 1 length: " + player1ActiveCards.length);
	// console.log(player1ActiveCards);
	// console.log("Player 2: ");
	console.log("array 2 length: " + player2ActiveCards.length);
	// console.log(player2ActiveCards);


});

