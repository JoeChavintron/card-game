import Matter from "matter-js";

const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let card1 = entities["card1"].body;
    let card2 = entities["card2"].body;
    let card3 = entities["card3"].body;

    let card1PositionX = -130;
    let card2PositionX = 0;
    let card3PositionX = 130;  

    moveCardToPostionCard(card1, card3PositionX);
    moveCardToPostionCard(card3, card1PositionX);

    Matter.Engine.update(engine, time.delta);
    

    return entities;
};

export default Physics;

function moveCardToPostionCard(card, cardPositionX) {
    
    if (cardPositionX > 0) {
        Matter.Body.translate(card, { x: 15, y: 0 });
        if (card.position.x >= cardPositionX) {
            Matter.Body.setPosition(card, { x: cardPositionX, y: Constants.MAX_HEIGHT / 2 });
        }
    } else {
        Matter.Body.translate(card, { x: -15, y: 0 });
        if (card.position.x <= cardPositionX) {
            Matter.Body.setPosition(card, { x: cardPositionX, y: Constants.MAX_HEIGHT / 2 });
        }
    }
}

function moveCardToPostionCardHalf(card, cardPositionX) {
    
    if (cardPositionX > 0) {
        Matter.Body.translate(card, { x: 20, y: 0 });
        if (card.position.x >= cardPositionX) {
            Matter.Body.setPosition(card, { x: cardPositionX, y: Constants.MAX_HEIGHT / 2 });
        }
    } else {
        Matter.Body.translate(card, { x: -20, y: 0 });
        if (card.position.x <= cardPositionX) {
            Matter.Body.setPosition(card, { x: cardPositionX, y: Constants.MAX_HEIGHT / 2 });
        }
    }
}
