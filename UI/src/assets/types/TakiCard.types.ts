type TakiColor = "red" | "blue" | "green" | "yellow";

type TakiCard = NumberCard | ActionCard | SuperTaki;

type NumberCard = {
    type: "number",
    value: number,
    color: TakiColor
};

type ActionCard = {
    type: "plusTwo" | "changeDir" | "stop" | "plus" | "taki",
    color: TakiColor
};

type SuperTaki = {
    type: "superTaki" | "changeColor",
    color: "all"
};