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
var player = "Player 1";
var isWar = false;
var player1Score = 0;
var player2Score = 0;

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

var testForWin = function(activeArray, playedArray, gamePlayer) {
	if(activeArray.length + playedArray.length === 52) {
		alert(gamePlayer + " has all the cards. " + gamePlayer + " WINS!!!");
		return;
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

//Remove card images from in-play stacks and display next player's turn
var moveCards = function() {
	$("#player-1-in-play img").attr("src", "");
	$("#player-2-in-play img").attr("src", "");
	$("#message-bar p").html("Player 1's Turn");
}

//Set message box for type of win
var setWinMessage = function(gamePlayer) {
	if(isWar) {
		$("#message-bar p").html(gamePlayer + " wins the WAR!");
	} else {
		$("#message-bar p").html(gamePlayer + " wins the hand!");
	}
}

var playHand = function() {
	var firstPlayer = "Player 1";
	var secondPlayer = "Player 2";

	if(gamePlayArray[cardCounter-2].rating > gamePlayArray[cardCounter-1].rating) {
		setTimeout(setWinMessage(firstPlayer), 1000);
		player1PlayedCards = player1PlayedCards.concat(gamePlayArray);
		setTimeout(moveCards, 1000);
		setTimeout(function() {
		$("#player-1-played img").attr("src", player1PlayedCards[player1PlayedCards.length-1].image.src);
		}, 1000);
		$("#player-1-num-cards").html(player1ActiveCards.length + player1PlayedCards.length);
		$("#player-2-num-cards").html(player2ActiveCards.length + player2PlayedCards.length);

		gamePlayArray = [];
		cardCounter = 0;
		isWar = false; 
		testForWin(player1ActiveCards, player1PlayedCards, firstPlayer);
		testForCards(player1ActiveCards, player1PlayedCards, firstPlayer, secondPlayer);
	} 
	else if(gamePlayArray[(cardCounter-2)].rating < gamePlayArray[cardCounter-1].rating) {
		setTimeout(setWinMessage(secondPlayer), 1000);
		player2PlayedCards = player2PlayedCards.concat(gamePlayArray);
		setTimeout(moveCards, 1000);
		setTimeout(function() {
		$("#player-2-played img").attr("src", player2PlayedCards[player2PlayedCards.length-1].image.src);
		}, 1000);
		$("#player-1-num-cards").html(player1ActiveCards.length + player1PlayedCards.length);
		$("#player-2-num-cards").html(player2ActiveCards.length + player2PlayedCards.length);
		
		gamePlayArray = [];
		cardCounter = 0;
		isWar = false;
		testForWin(player2ActiveCards, player2PlayedCards, secondPlayer);
		testForCards(player2ActiveCards, player2PlayedCards, secondPlayer, firstPlayer);
	} else if(gamePlayArray[cardCounter-2].rating === gamePlayArray[cardCounter-1].rating) {
		swal({title: "It's a WAR!!!",   text: "This hand was a tie.",   imageUrl: "images/crossed_swords.png", imageSize: "300x300"});

		// Check if either player's hand is empty
		if((testForCards(player1ActiveCards, player1PlayedCards, firstPlayer, secondPlayer)) && (testForCards(player2ActiveCards, player2PlayedCards, secondPlayer, firstPlayer))) {
			isWar = true; 
			player = "Player 1";
			$("#message-bar p").html("Player 1's Turn");
		}
	}
}

var getCard = function(player) {
	if(player === "Player 1") {
		//Moves the first card from player 1's active cards and adds to game play array
		gamePlayArray[cardCounter] = player1ActiveCards.shift();
		$("#player-1-in-play img").attr("src", gamePlayArray[cardCounter].image.src);
	} else {
		//Moves the first card from player 2's active cards and adds to game play array
		gamePlayArray[cardCounter] = player2ActiveCards.shift();
		$("#player-2-in-play img").attr("src", gamePlayArray[cardCounter].image.src);
	}
	cardCounter++;
}

$(document).ready(function() {
	console.log("javascript works now!");
	$("#game-wrapper").hide();

	$("#new-game").on("click", function(e){
		e.preventDefault();
		$("#splash-wrapper").remove();
		$("#game-wrapper").show();	
		$("#left-arrow").hide();
		$("#right-arrow").hide();
		createDeck();
		shuffleDeck(fullDeck);
	});

	$("#deal-cards").on("click", function(e){
		e.preventDefault();
		dealToPlayers();
		//Change card stack backgrounds from transparent to oblique
		$("div.transparent").addClass("oblique").removeClass("transparent");

		//Set active cards to show card backs
		$("#player-1-active img").attr("src", "images/back.png");
		$("#player-2-active img ").attr("src", "images/back.png");

		$("#message-bar p").html("Player 1's Turn");
		$("#player-2-active").addClass("disabled transparent").removeClass("enabled oblique");
		$("#deal-cards").hide();

		$("#player-1-num-cards").html(player1ActiveCards.length);
		$("#player-2-num-cards").html(player2ActiveCards.length);
	});

	$("#game-wrapper").on("click", ".enabled", function(e) {
		$( "div.transparent").addClass("oblique").removeClass("transparent");
		if(player==="Player 1") {
			getCard(player);
			player = "Player 2";
			$("#message-bar p").html("Player 2's Turn");
			$("#player-1-active").addClass("disabled transparent").removeClass("enabled oblique");
			$("#player-2-active").addClass("enabled oblique").removeClass("disabled transparent");

			player1Total = player1ActiveCards.length + player1PlayedCards.length;
			console.log("Player 1 cards: " + player1Total);
			return;
		} if(player==="Player 2") {
			getCard(player);
			playHand(); 
			player = "Player 1";
			$("#player-1-active").addClass("enabled oblique").removeClass("disabled transparent");
			$("#player-2-active").addClass("disabled transparent").removeClass("enabled oblique");
			
			player2Total = player2ActiveCards.length + player2PlayedCards.length;
			console.log("Player 2 cards: " + player2Total);
			return;
		}
	});

	$("#instructions").on("click", function(e){
		window.location.href = "how_to_play.html";
	});

	$("#end-game").on("click", function(e){
		document.location.reload() ;
	});

	$("#return-home").on("click", function(e){
		e.preventDefault();
		window.location.href = "index.html";
	});
});

