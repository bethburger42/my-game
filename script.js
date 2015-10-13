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

var testForWin = function() {
	if(player1PlayedCards.length === 52) {
		alert("Player 1 has all the cards. Player 1 WINS!!!");
	} else if(player2PlayedCards.length === 52){
		alert("Player 2 has all the cards. Player 2 WINS!!!");
	}
}

var emptyHand = function(activeArray, playedArray, play1, play2) {
		if(playedArray.length > 0) {
			activeArray = playedArray;
			return true;
		} else {
			alert(play1 + " has no more cards to play. " + play2 + " wins!");
			return false;
		}
}

var testForCards = function (a1, a2, p1, p2) {
	firstPlayer = "Player 1";
	secondPlayer = "Player 2";
	if((a1.length > 0) && (a2.length > 0)) {
		return true;
	}
	else if(a1.length === 0) {
		if(emptyHand(a1, p1, firstPlayer, secondPlayer)) {
			return true;
		} else {return false;}
	} 
	if(a2.length === 0) {
		if(emptyHand(a2, p2, secondPlayer, firstPlayer)) {
			return true;
		} else {return false;}
	} 
	}
}

// var playWar = function() {
// 	gamePlayArray[cardCounter] = player1ActiveCards.shift();
// 	cardCounter++;
// 	gamePlayArray[cardCounter] = player2ActiveCards.shift();
// 	cardCounter++;
// }

var playHand = function() {
	var a1 = player1ActiveCards;
	var a2 = player2ActiveCards;
	var p1 = player1PlayedCards;
	var p2 = player2PlayedCards;

	if(a1[0].rating > a2[0].rating) {
		console.log("player 1 card " + a1[0].rating + " wins over: " + a2[0].rating);
		p1[0] = a1.shift();
		p1[1] = a2.shift();
		// console.log("player 1 array length: " + player1PlayedCards.length);
		// console.log("player 2 array length: " + player2PlayedCards.length);
		testForWin();
	} else if(a1[0].rating < a2[0].rating) {
		console.log("player 2 card " + a2[0].rating + " wins over: " + a1[0].rating);
		p2[0] = a1.shift();
		p2[1] = a2.shift();
		// console.log("player 1 array length: " + player1PlayedCards.length);
		// console.log("player 2 array length: " + player2PlayedCards.length);	
		testForWin();
	} else if(a1[0].rating === a2[0].rating) {
			alert("It's a WAR!");
			if(testForCards(a1, a2, p1, p2)) {
				// playWar(); 
			}
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

