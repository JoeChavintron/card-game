import React, { Component } from 'react';
import {StyleSheet, View,TouchableOpacity,Text, Alert } from 'react-native';
import Matter, { Bodies, Constraint } from "matter-js"; 
import { GameEngine } from "react-native-game-engine";
import Physics from './Physics';
import Images from './Images';
import Constains from './Constants';
import Card from './Card';

export const randomBetween = () => {
  
  let random = Math.floor(Math.random() * 100) + 1 ;
 
  if (random >= 60) {
    return [Images.front_card1,"1"];
  }
  if (random >= 50) {
    return [Images.front_card2,"2"];
  }   
  return [Images.front_card1,"3"];  
}

export default class App extends Component {
    constructor(prop) {
      super(prop);
      
      this.state = {
        running: false
      };

      this.GameEngine = null;
      this.entities = this.setupWorld();
    }
    

    setupWorld = () => {
      let engine = Matter.Engine.create({ enableSleeping: false });
      let world = engine.world;
    
      let card1 = Matter.Bodies.rectangle( -130, Constants.MAX_HEIGHT / 2, 100,150, { isStatic: true });
      let card2 = Matter.Bodies.rectangle( 0, Constants.MAX_HEIGHT / 2, 100,150, { isStatic: true });    
      let card3 = Matter.Bodies.rectangle( 130, Constants.MAX_HEIGHT / 2, 100,150, { isStatic: true });      
      let mainCard = Matter.Bodies.rectangle( 0, Constants.MAX_HEIGHT / 3.5, 100,150, { isStatic: true });

      Matter.World.add(world, [card1, card2, card3]);

      let cardResult = randomBetween()

      Matter.Events.on(engine, 'tick', function(event) {
        
        if (cardResult[1] == event[0]) {
          alert("success");
        } else {
          alert("fail");
        }
        //   alert(cardResult[1] + event[0]);
        // } else {
        //   alert("error");
        // }
      });
      
      return {
        physics: { engine: engine, world: world },
        card1: { body: card1, size: [100, 150],imageFront: Images.front_card1,engine:engine,number:"1", renderer: Card},
        card2: { body: card2, size: [100, 150],imageFront : Images.front_card2,engine:engine,number:"2", renderer: Card},
        card3: { body: card3, size: [100, 150],imageFront: Images.front_card3,engine:engine,number:"3", renderer: Card},
        mainCard: { body: mainCard, size: [150, 210],imageFront: cardResult[0],isMainCard:true,engine:engine, renderer: Card},
      }
    }
    // onEvent = (e) => {
    //   if (e.type == "game-over") {
    //     this.setState({
    //       running: true
    //     });  
    //   }
    // }


    startGame = () => {
      this.setState({
        running:true
      });
    }

    render() {
      return (
        <View style={styles.contaner}>
          <GameEngine
          ref={(ref) => { this.GameEngine = ref; }}
          style={styles.gameContainer}
          systems={[Physics]}
          running={this.state.running}
          entities={this.entities}>
          </GameEngine>
          {!this.state.running && <TouchableOpacity style={styles.fullScreenButton} onPress={this.startGame}>
              <View style={styles.fullScreen}>
                  <Text style={styles.startGameText}>Tap to Start</Text>
              </View>
          </TouchableOpacity>}
        </View>
      );
    }
}

const styles = StyleSheet.create({
  contaner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
},
fullScreenButton: {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  flex: 1
},
  startGameText: {
    color: 'white',
    fontSize: 48
}
});
