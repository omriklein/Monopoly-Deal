type TakiColorType = "red" | "blue" | "green" | "yellow";
type TakiNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type TakiActionType = "plusTwo" | "changeDir" | "stop" | "plus" | "taki";

type TakiCard = NumberCard | ActionCard | SuperTaki;

type NumberCard = {
    type: "number",
    value: TakiNumberType,
    color: TakiColorType
};

type ActionCard = {
    type: TakiActionType,
    color: TakiColorType
};

type SuperTaki = {
    type: "superTaki" | "changeColor",
    color: "all"
};