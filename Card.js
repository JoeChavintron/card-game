import React, {Component} from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated,Image,Text,ImageBackground } from 'react-native';
import Matter, { Bodies, Constraint } from "matter-js"; 
import Images from './Images';
 
export default class Card extends Component {
 
  constructor(){
    super();
    this.state={
        imageSelect: Images.card,
        animation : new Animated.Value(1),
        pointDisplayState:"none",
    }
  }

  onPress = () => {
    if (this.state.imageSelect != Images.card) {
        return
    }
    Animated.timing(this.state.animation, {
        toValue : 0,
        timing : 5
      }).start(()=>{
        Animated.timing(this.state.animation,{
          toValue : 1,
          duration : 5
        }).start();
        this.setState({
            imageSelect: Images.front_card,
            pointDisplayState:"flex",
        })
      })
    Matter.Events.trigger(this.props.engine, 'tick',this.props.tag)    
    
    }

 
  render() {
 
    const animatedStyle ={
      opacity : this.state.animation
    }

    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    const point = this.props.point;
    
    // const point = this.props.randomPoint;
    

    return (
        <View
        style= {{
            position: 'absolute',
            top: y,
            left: x,
            width: width,
            height: height
        }}>
            
         <TouchableWithoutFeedback onPress={this.onPress}>
            <Animated.View style={[animatedStyle]}> 
            <ImageBackground source={this.state.imageSelect} style={{width: '100%', height: '100%'}}>
                <Text 
                style={{
                    top: 45,   
                    color: 'white',
                    textAlign:"center",
                    fontSize: 30,   
                    display:this.state.pointDisplayState    
                    }}>{point}</Text>
            </ImageBackground>
           </Animated.View>
         </TouchableWithoutFeedback>  
         </View>
    );
  }
};
