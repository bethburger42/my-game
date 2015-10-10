var cardNames = ["2","3","4","5","6","7","8","9","10","J","K","Q","A"];
var cardSuits = ["C","D","H","S"];
var fullDeck = [];
var card;
// var card = {cardNum: "", cardSuit: ""};
var player1ActiveCards = [];
var player2ActiveCards = [];
var gamePlayArray = [];
var player1DealtCards = [];
var player2DealtCards = [];
var warCounter = 0;

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
				console.log(fullDeck);
		}
	}
}


$(document).ready(function() {
	console.log("javascript works!");
	createDeck();

	});

