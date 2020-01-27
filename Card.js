import React, { Component } from 'react';
import { View,Image,TouchableHighlight,Text } from 'react-native';
import Images from './Images';
import Matter, { Bodies, Constraint } from "matter-js"; 
export default class Card extends Component {

    

    constructor(props) {
        super(props)
        this.state = { 
            imageSelect: Images.card
         }
      }

    onPress = () => {
        Matter.Events.trigger(this.props.engine, 'tick',this.props.number)    
        this.setState({
            imageSelect: this.props.imageFront
        })
    }
    

    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;
        // const point = this.props.randomPoint;
        
        if (this.props.isMainCard == true) {
            this.state.imageSelect = this.props.imageFront
        }   
        
        
        return (
            <View
            style= {{
                position: 'absolute',
                top: y,
                left: x,
                width: width,
                height: height
            }}>
                <TouchableHighlight onPress={this.onPress} >
                    <Image  
                style={{width: width, height: height}}
                source={this.state.imageSelect}
                />
            </TouchableHighlight>
        </View>
        );
    }
}