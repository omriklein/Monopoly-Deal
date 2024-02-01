export default class Game {
    static readonly MAX_PLAYERS = 4;
    static readonly MIN_PLAYERS = 2;

    players: Player[] = []; // 2 - 4
    currentPlayer: number = 0;
    gameDirection: number = 1;

    lastCard: TakiCard;

    takeAmount = 1;

    status: "setup" | "playing" | "ended" = "setup";

    constructor() {
        // this.players = playerNames.map((name) => { return { name: name, cards: [] } });

        // Get random first card:
        this.lastCard = { type: "number", color: "red", value: 5 };
    }

    addPlayer(id: string, name: string) {
        this.players.push({ id, name, cards: [], isReady: false });
    }
    removePlayer(id: string) {
        this.players = this.players.filter(player => player.id !== id);
    }

    playerReady(id: string, isReady: boolean) {
        const player = this.players.find(player => player.id = id);
        if(!player){
            // Error
            return;
        }
        player.isReady = isReady;

        // Check if all players are ready
        if(this.players.every((player) => player.isReady)){
            // TODO: Start game
            console.log("Start the game");
        }
    }

    playTurn(card?: TakiCard) {

        if (!card) {
            console.log("take a card");
            return;
        }

        if (!this.canPlaceCard(card)) {
            console.log("Failed to place card", card);
            return "Failed to place card"; // TODO: some error
        }

        let skip = false; // If continue to play or have another turn
        let stay = false;
        switch (card.type) {
            case "number":
                this.playNumber();
                break;
            case "plus":
                stay = true;
                break;
            case "changeDir":
                this.gameDirection *= -1;
                break;
            case "stop":
                skip = true;
                break;
            case "plusTwo":
                this.playPlusTwo();
                break;
            case "taki":
                console.log(`taki card is not supported yet`);
                break;
            case "superTaki":
                console.log(`supertaki card is not supported yet`);
                break;
        }
        this.lastCard = card;
        // TODO: remove the card from the player

        this.endTurn(stay, skip);
        return this.currentPlayer;
    }

    canPlaceCard(card: TakiCard): boolean {
        // same card type
        if (this.lastCard.type === card.type && this.lastCard.type !== "number") {
            return true;
        }
        // number - same value
        if (this.lastCard.type === "number" && card.type === "number" && this.lastCard.value == card.value) {
            return true;
        }
        // color match
        if (this.lastCard.color === "all" || card.color === "all" || (this.lastCard.color === card.color)) {
            return true;
        }
        return false;
    }

    playNumber() {
        console.log(`playing a number card`);
    }

    playPlusTwo() {
        console.log(`playing plus two`);
        this.takeAmount = this.takeAmount === 1 ? 2 : this.takeAmount + 2;
    }

    endTurn(skip: boolean = false, stay: boolean = false) {
        if (stay) {
            return;
        }
        if (this.players[this.currentPlayer].cards.length === 0) {
            console.log(`Player ${this.players[this.currentPlayer].name} won!`);
        }
        this.currentPlayer += this.gameDirection * (skip ? 2 : 1);
    }
}