abstract class CardGenerator {

    public static getShuffledTakiCards(): TakiCard[] {
        return this.shuffleCards(this.generateTakiCards());
    }

    public static generateTakiCards(): TakiCard[] {
        let cards: TakiCard[] = [];
        const colors: TakiColorType[] = ["red", "green", "blue", "yellow"];

        const numberCards: NumberCard[] = this.generateNumbersTakiCards(colors);
        cards = cards.concat([...numberCards, ...numberCards]); // Two from each number card

        const actionCards: ActionCard[] = this.generateActionCards(colors);
        cards = cards.concat([...actionCards, ...actionCards]); // Two from each action card

        // 2 super taki
        const superTakiCard = { type: "superTaki", color: "all" } as SuperTaki;
        cards.push(superTakiCard, superTakiCard); // Two super taki cards

        // 4 change color
        const changeColorCard = { type: "changeColor", color: "all" } as SuperTaki;
        cards.push(changeColorCard, changeColorCard, changeColorCard, changeColorCard); // Four change color cards

        return cards;
    }

    public static shuffleCards(cards: TakiCard[]): TakiCard[] {
        const shuffled: TakiCard[] = [];

        const len = cards.length;
        let index: number;
        for (let i = len - 1; i >= 0; i--) {
            index = Math.floor(Math.random() * (i + 1));
            [cards[index], cards[i]] = [cards[i], cards[index]];
        }

        return shuffled;
    }

    private static generateNumbersTakiCards(colors: TakiColorType[]) {
        const numbers: TakiNumberType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const numberCards: NumberCard[] = numbers.flatMap(number => {
            const cards: NumberCard[] = colors.map(color => {
                return {
                    type: "number",
                    color: color,
                    value: number
                };
            });
            return cards;
        });

        return numberCards;
    }

    private static generateActionCards(colors: TakiColorType[]) {
        const actions: TakiActionType[] = ["stop", "taki", "changeDir", "plus", "plusTwo"];

        const actionCards: ActionCard[] = actions.flatMap(actionType => {
            const cards: ActionCard[] = colors.map(color => {
                return {
                    type: actionType,
                    color: color
                };
            });
            return cards;
        });

        return actionCards;
    }
}