# Backend for the taki game

The server works using websockets that the user opens at the begging.

Rooms: users enter rooms to play in. each room will be able to containe up to {MAX} number of players.

Calls:

"JoinRoom": join a room with a username and roomkey

"Ready" : 
The message will contain `True | False` value to symbol if the player is ready or not.
If all players are ready to play (with at least {MIN}), the game will start.

"UseCard" : 
The message will contain the card that the player playes in his turn.
An "UseCard" event will be returned to all other players for them to show the card.

"TakeCard" : 
The player takes a card.

"EndTurn" : 
The player ends his turn and the turn moves to the next player.
An "EndTurn" event will be returned to the next player with the last card on the pile.

> Logic Note: we separate the "UseCard", "TakeCard" and "EndTurn" for cards like "+", "taki" and other cards.

> Game Note: The logic of the players will be on the front-end, not the backend - for simplicity and server preformance.