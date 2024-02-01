import Game from "./game.class";

export default abstract class GameService {

    private static rooms: Record<string, Game> = {};

    public static addGame(roomKey: string) {
        if (this.rooms[roomKey]) {
            console.log("This room already exists");
            return;
        }
    }

    public static joinGame(roomKey: string, id: string, name: string): "Success" | "Failed" {
        
        let game = this.rooms[roomKey];
        if(!game) { // New Game
            game = this.rooms[roomKey] = new Game();
        }
        if (game.status === "playing") {
            // Cannot join a game while its playing
            return "Failed";
        }
        if (game.players.length >= Game.MAX_PLAYERS) {
            // Room is full
            return "Failed";
        }

        game.addPlayer(id, name);        
        return "Success";
    }

    public static deleteGame(roomKey: string) {
        delete this.rooms[roomKey];
        // TODO: If there are any players in this room - kick them out.
    }

    public static getGame(roomKey: string) {
        return this.rooms[roomKey];
    }

    static readyGame(roomKey: string, id: string, isReady: boolean) {
        // this.rooms[roomKey].readyPlayer(id);
        // If all players are ready, start the game
        this.rooms[roomKey].playerReady(id, isReady);
    }
}