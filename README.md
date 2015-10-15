<h1>The Game of WAR</h1>
<h2>Author: Beth Ernsberger</h2>

<h3>About the Game</h3>
<p>WAR is a card game using a 52 card deck. The cards are dealt randomly between two players. Players take turns flipping the top card of their deck over. The player with the highest card wins the hand. If the card values are even, this is a WAR. The cards remain and the players play their next cards face up on their previous card. The player with highest card wins all the cards. If the cards are even, then this is another WAR and the players play their next cards. This continues until a player wins the hand. The object of the game is to win all of the cards.
</p>

<h3>Technologies Used</h3>
<ul>
<li>HTML</li>
<li>CSS</li>
<li>JQuery</li>
<li>Bootstrap</li>
<li>SweetAlert.css</li>
</ul>

<h3>Approach Taken</h3>
<p>
I began with creating the site functionality in JQuery, to ensure the card game dealing, shuffling and game play worked. Then I moved on to designing the front page, from a mockup created in Balsamic, utilizing a Bootstrap framework. I developed the CSS at the same time as the HTML. Inserting buttons into the page led to changes in the JQuery functionality. This required a lot of redesign of the script.js code. Once I had the front-end matching the back-end of the site, I moved on to creating additional functionality, such as displaying card images, toggling active/inactive players, using SweetAlerts instead of the built-in alerts, and tracking and displaying the player scores. 
</p>

<h3>Unsolved Problems</h3>
<p>Timeouts needed for alerts in the case where there is a war and a player runs out of cards. Issues with centering page elements. Animations not displayed due to conflicts with using Animate.css and Bootstrap. The site elements should be resizeable depending on the screen size. 
</p>
