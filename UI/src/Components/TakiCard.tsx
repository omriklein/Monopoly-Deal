import { Paper, styled } from '@mui/material';
import React from 'react';
import { BackHand, ColorLensTwoTone, SwapHoriz } from '@mui/icons-material'


const cardDisplayMap = (card: TakiCard): JSX.Element | string | number => {
    switch (card.type) {
        case 'number': return card.value;
        case 'plusTwo': return "+2";
        case 'changeDir': return <SwapHoriz />;
        case 'stop': return <BackHand />;
        case 'plus': return "+";
        case 'taki': return "taki";
        case 'superTaki': return "super taki";
        case 'changeColor': return <ColorLensTwoTone />;
    }
};

const TakiCard: React.FC<{ card: TakiCard }> = (props: { card: TakiCard }) => {

    console.log(props.card);

    const cardColor = props.card.color === "all" ? "gray" : props.card.color;
    const DemoPaper = styled(Paper)(({ theme }) => ({
        width: 120,
        height: 120,
        padding: theme.spacing(2),
        ...theme.typography.body2,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: cardColor,
    }));

    return (
        <DemoPaper variant="elevation" color=''>
            {cardDisplayMap(props.card)}
        </DemoPaper>
    );
};

export default TakiCard;