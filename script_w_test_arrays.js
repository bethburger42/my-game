var cardNames = ["2","3","4","5","6","7","8","9","10","J","K","Q","A"];
var cardSuits = ["Clubs","Diamonds","Hearts","Spades"];
var fullDeck = [];
var imageURL = "";
var imageTitle = "";
var rating = 0;
var card;
var player1ActiveCards = [];
var player2ActiveCards = [];
var gamePlayArray = [];
var player1PlayedCards = [];
var player2PlayedCards = [];
var cardCounter = 1;
var player = "";

var Card = function(newName, newSuit, newRating, newImage) {
	this.name = newName;
	this.suit = newSuit;
	this.rating = newRating;
	this.image = newImage
}

var addCard= function(newName, newSuit, newRating, newImage) {
	//Add a card to the fullDeck
	card = new Card(newName, newSuit, newRating, newImage);
	fullDeck[fullDeck.length] = card;
}

var createImage = function(src, alt) {
  var img   = new Image();
  img.src   = src;
  img.alt   = alt;
  return img; 
};

var createDeck = function() {
	fullDeck = [];
	for(var x=0; x<cardSuits.length; x++) {	
		console.log("cardSuits length: " + cardSuits.length);
		for(var i=0; i<cardNames.length; i++) {
			console.log("cardNames length: " + cardNames.length);
			rating = i + 1;
			imageURL = "images/" + cardSuits[x] + "/" + cardNames[i] + ".png";
			imageTitle = cardNames[i] + " " + cardSuits[x];
			addCard(cardNames[i],cardSuits[x],rating, createImage(imageURL, imageTitle));
		}
	}
	console.log(fullDeck);
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
		if(cardCounter % 2 === 0) {
			player1ActiveCards[player1ActiveCards.length] = fullDeck[i];
			cardCounter++;
		} else {
			player2ActiveCards[player2ActiveCards.length] = fullDeck[i];
			cardCounter++;
		}
	}
	cardCounter = 0;
}

var testForWin = function(activeArray, playedArray, player) {
	if(activeArray.length + playedArray.length === 52) {
		alert(player + " has all the cards. " + player + " WINS!!!");
	} 
}

var handNotEmpty = function(activeArray, playedArray, playA, playB) {
		if(playedArray.length > 0) {
			activeArray = playedArray;
			return true;
		} else {
			alert(playA + " has no more cards to play. " + playB + " wins!");
			return false;
		}
}

var testForCards = function (activeArray, playedArray, playerA, playerB) {
	if(activeArray.length > 0) {
		console.log(playerA + " has cards!");	
		return true;
	}
	else if(handNotEmpty(activeArray, playedArray, playerA, playerB)) {
		return true;
	} else {
		return false;
	}
}

var playWar = function() {
	//set divs in place so that next cards lay on top.

}

var playHand = function() {
	var firstPlayer = "Player 1";
	var secondPlayer = "Player 2";

	if(gamePlayArray[cardCounter-2].rating > gamePlayArray[cardCounter-1].rating) {
		alert("player 1 card " + gamePlayArray[cardCounter-2].rating + " wins hand over p2: " + gamePlayArray[cardCounter-1].rating);
		
		player1PlayedCards = player1PlayedCards.concat(gamePlayArray);
	
		console.log("player 1 active: "+ player1ActiveCards.length);
		console.log(player1ActiveCards);
		console.log("player 1 played: "+ player1PlayedCards.length);
		console.log(player1PlayedCards);
		gamePlayArray = [];
		cardCounter = 0;
		testForWin(player1ActiveCards, player1PlayedCards, firstPlayer);
	} 
	else if(gamePlayArray[(cardCounter-2)].rating < gamePlayArray[cardCounter-1].rating) {
		alert("player 2 card " + gamePlayArray[cardCounter-2].rating + " wins hand over p1: " + gamePlayArray[cardCounter-1].rating);
		player2PlayedCards = player2PlayedCards.concat(gamePlayArray);
		console.log("player 2 active: " + player2ActiveCards.length);
		console.log(player2ActiveCards);
		console.log("player 2 played: " + player2PlayedCards.length);
		console.log(player2PlayedCards);
		gamePlayArray = [];
		cardCounter = 0;
		testForWin(player2ActiveCards, player2PlayedCards, secondPlayer);
	} else if(gamePlayArray[cardCounter-2].rating === gamePlayArray[cardCounter-1].rating) {
			alert("It's a WAR!");
			// See if either player's hand is empty
			if((testForCards(player1ActiveCards, player1PlayedCards, firstPlayer, secondPlayer)) && (testForCards(player2ActiveCards, player2PlayedCards, secondPlayer, firstPlayer))) {
				playWar(); 
			}
	}
}

var getCard = function(player) {
	if(player === "Player 1") {
		//Moves the first card from player 1's active cards and adds to game play array
		gamePlayArray[cardCounter] = player1ActiveCards.shift();
	} else {
		//Moves the first card from player 2's active cards and adds to game play array
		gamePlayArray[cardCounter] = player2ActiveCards.shift();
	}
	cardCounter++;
	//results after first hand:  gamePlayArray[0] = player 1's card
	//							 gamePlayArray[1] = player 2's card
}

$(document).ready(function() {
	console.log("javascript works now!");

$("#new-game").on("click", function(e){
	e.preventDefault();

    $( "#draggable" ).draggable();
    $( "#droppable" ).droppable({
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });

	createDeck();
	shuffleDeck(fullDeck);
	
});

$("#deal-cards").on("click", function(e){
	e.preventDefault();
	dealToPlayers();
	console.log("player 1:");
	console.log(player1ActiveCards);
	console.log("player 2:");
	console.log(player2ActiveCards);
});

$("#player-1-card").on("click", function(e){
	player = "Player 1"
	getCard(player);

	//Test case: for WAR (comment out getCard(player))
	// player1ActiveCards = []; //Test case: Player 1 has no cards to play
	// gamePlayArray[cardCounter] = new Card("10", "C", 9);
	// cardCounter++;
	//End test case

	console.log("player 1 card: "); 
	console.log(gamePlayArray[0]);

});

$("#player-2-card").on("click", function(e){
	player = "Player 2"
	getCard(player);

	//Test case: for WAR (comment out getCard(player))
	// gamePlayArray[cardCounter] = new Card("10", "S", 9);
	// cardCounter++;
	//End test case

	console.log("player 2 card: ");
	console.log(gamePlayArray[1]);

	playHand();
});
	


});

