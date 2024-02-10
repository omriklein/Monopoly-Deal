import { useEffect, useState } from "react";
import TakiCard from "./TakiCard";

const GamePage = (prpos: any) => {

    const [cards, setCards] = useState<TakiCard[]>([]);

    useEffect(() => {
        addCards(8);
    }, []);

    // get from server
    const addCards = (n: Number) => {
        const c1: TakiCard = { type: "number", color: "red", value: 5 };
        const c2: TakiCard = { type: "number", color: "red", value: 4 };
        const c3: TakiCard = { type: "number", color: "blue", value: 5 };
        const c4: TakiCard = { type: "number", color: "blue", value: 4 };
        setCards([...cards, c1, c2, c3, c4]);
    }

    const playCard = (index: number) => {
        console.log(`remvoe at index ${index}`);
        cards.splice(index, 1);
        setCards([...cards]);
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