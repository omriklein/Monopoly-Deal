import { useEffect, useState } from "react";
import TakiCard from "./TakiCard";
import { Socket } from "socket.io-client";
import { useSocekt } from "../Context/SocketContext";

const getRandomDegrees = () => {
    return Math.floor(Math.random() * 360);
}

const GamePage = () => {

    const [cards, setCards] = useState<TakiCard[]>([]);
    const [topCard, setTopCard] = useState<TakiCard>();
    const [discardedCards, setDiscardedCards] = useState<{card: TakiCard, degrees: number}[]>([]);

    const socket = useSocekt();

    useEffect(() => {
        const newcards = getCards(8);
        setCards(newcards);
        initSocketListeners(socket);
    }, []);

    const initSocketListeners = (socket: Socket) => {
        socket.on('card', (data: any) => {
            const { player: string, card } = data;
            // data is player id and the top card played
            setTopCard(card);
        });

        socket.on('endTurn', () => {
            // update current player
        });

        socket.on('gameWon', () => {
            // update who won
        });

        socket.on('getCards', (newCards: TakiCard[]) => {
            setCards([...cards, ...newCards]);
            // if my turn, End turn
        });
    };

    // get from server
    const getCards = (n: Number = 8) => {
        const c1: TakiCard = { type: "number", color: "red", value: 5 };
        const c2: TakiCard = { type: "number", color: "red", value: 4 };
        const c3: TakiCard = { type: "number", color: "blue", value: 5 };
        const c4: TakiCard = { type: "number", color: "blue", value: 4 };
        return [c1, c2, c3, c4];
    };

    const playCard = (index: number) => {
        if(!canPlayCard(cards[index])){
            alert("Ho no! you cannot play this card");
            return;
        }
        setTopCard(cards[index]);
        
        console.log(`remvoe at index ${index}`);
        const usedCard = cards.splice(index, 1);
        setCards([...cards]);
        const usedCardDeg = usedCard.map(card => {return {card, degrees: getRandomDegrees()}});
        setDiscardedCards([...discardedCards, ...usedCardDeg]);
    };

    const drawCards = (n: number = 1) => {
        const newCards = getCards(n);
        setCards([...cards, ...newCards]);
    };

    const canPlayCard = (card: TakiCard): boolean => {
        if(!topCard){
            return true;
        }
        // same card type
        if (topCard.type === card.type && topCard.type !== "number") {
            return true;
        }
        // number - same value
        if (topCard.type === "number" && card.type === "number" && topCard.value == card.value) {
            return true;
        }
        // color match
        if (topCard.color === "all" || card.color === "all" || (topCard.color === card.color)) {
            return true;
        }
        return false;
    };

    return (
        <>
            game
            -{cards.length}-
            <div style={{ display: "flex" }}>
                {
                    cards.map((card, index) => {
                        return (
                            <div style={{ userSelect: "none", marginRight: "-50px" }} onClick={() => playCard(index)}>
                                <TakiCard card={card} />
                            </div>
                        );
                    })
                }
            </div>
            <div id="cardsPile">
                {discardedCards.map(({card, degrees}) => {
                    return (
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: `rotateZ(${degrees}deg)` }}>
                            <TakiCard card={card} />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default GamePage;