import { useEffect, useState } from "react";
import TakiCard from "./TakiCard";

const GamePage = (prpos: any) => {

    const [cards, setCards] = useState<TakiCard[]>([]);

    useEffect(() => {
        const newcards = getCards(8);
        setCards(newcards);
    }, []);

    // get from server
    const getCards = (n: Number) => {
        const c1: TakiCard = { type: "number", color: "red", value: 5 };
        const c2: TakiCard = { type: "number", color: "red", value: 4 };
        const c3: TakiCard = { type: "number", color: "blue", value: 5 };
        const c4: TakiCard = { type: "number", color: "blue", value: 4 };
        return [c1, c2, c3, c4];
    }
    
    const playCard = (index: number) => {
        console.log(`remvoe at index ${index}`);
        cards.splice(index, 1);
        setCards([...cards]);
    }
    
    const drawCards = (n: number = 1) => {
        const newCards = getCards(n);
        setCards([...cards, ...newCards]);
    }

    return (
        <>
            game
            -{cards.length}-
            <div style={{ display: "flex" }}>
                {
                    cards.map((card, index) => {
                        return (
                            <div style={{userSelect: "none" ,marginRight: "-50px"}} onClick={() =>playCard(index)}>
                                <TakiCard card={card} />
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};

export default GamePage;