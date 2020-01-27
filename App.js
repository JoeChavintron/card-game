import React, { Component } from 'react';
import {StyleSheet, View,TouchableOpacity,Text, ImageBackground,Alert } from 'react-native';
import Matter from 'matter-js';
import { GameEngine } from 'react-native-game-engine';
import Physics from './Physics';
import Images from './Images';
import Constains from './Constants';
import Card from './Card';

export const randomBetween = () => {
  return Math.floor(Math.random() * 100) + 1 ;
}

export default class App extends Component {
    constructor(prop) {
      super(prop);
      
      this.state = {
        running: false,
        point:0
      };

      this.gameEngine = null;
      this.entities = this.setupWorld();
    }
    

    setupWorld = () => {
      let engine = Matter.Engine.create({ enableSleeping: false });
      let world = engine.world;
    
      let card1 = Matter.Bodies.rectangle( -130, Constants.MAX_HEIGHT / 2, 90,150, { isStatic: true });
      let card2 = Matter.Bodies.rectangle( 0, Constants.MAX_HEIGHT / 2, 90,150, { isStatic: true });    
      let card3 = Matter.Bodies.rectangle( 130, Constants.MAX_HEIGHT / 2, 90,150, { isStatic: true });      
      
      let cardPoint1 = randomBetween()
      let cardPoint2 = randomBetween()
      let cardPoint3 = randomBetween()
      
      Matter.World.add(world, [card1, card2, card3]);

      let cardResult = randomBetween()


      Matter.Events.on(engine, "tick", (event) => {
        let tag = event[0]; 
        switch (tag) {
          case "1":
            this.gameEngine.dispatch({ point: cardPoint1});
            break;
          case "2":
            this.gameEngine.dispatch({ point: cardPoint2});
            break;
          default: 
          this.gameEngine.dispatch({ point: cardPoint3});
            break;
        }
      });
      
      return {
        physics: { engine: engine, world: world },
        card1: { body: card1, size: [90, 150],engine:engine,point:cardPoint1,tag:"1",show:false, renderer: Card},
        card2: { body: card2, size: [90, 150],engine:engine,point:cardPoint2,tag:"2",show:false, renderer: Card},
        card3: { body: card3, size: [90, 150],engine:engine,point:cardPoint3,tag:"3",show:false, renderer: Card},
      }
    }

    onEvent = (e) => {
      if (e.point >= 0) {
        this.setState({
          point:e.point
        });
      }
      
    }
    
    reset = () => {
      this.setState({ 
        running:true,
        point:0
      });
    }

    startGame = () => {
      this.setState({
        running:true
      });
    }

    render() {
      return (
        <ImageBackground source={Images.background} style={styles.contaner}>
          <GameEngine
          ref={(ref) => { this.gameEngine = ref; }}
          style={styles.gameContainer}
          systems={[Physics]}
          running={this.state.running}
          onEvent={this.onEvent}
          entities={this.entities}>
          </GameEngine>
          {!this.state.running && <TouchableOpacity style={styles.fullScreenButton} onPress={this.startGame}>
              <View style={styles.fullScreen}>
                  <Text style={styles.startGameText}>Tap to Start</Text>
              </View>
          </TouchableOpacity>}
          {this.state.point != 0 && <TouchableOpacity style={styles.fullScreenButton} onPress={this.reset}>
              <View style={styles.fullScreen}>
      <Text style={styles.startGameText}>You got {this.state.point}</Text>
              </View>
          </TouchableOpacity>}
        </ImageBackground>
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
    opacity: 0.8,
    justifyContent: 'center',
    resizeMode: 'stretch',
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
