import React, { Component } from "react";
import BottomTabNavigator from "./components/BottomTabNavigator";
import {Rajdhani_600SemiBold} from "@expo-google-fonts/rajdhani";
import *as Font from 'expo-font';

export default class App extends Component {
 
  constructor(){
    super();
    this.sate={
      fontloaded:false
    }


  }

  async loadfonts(){
    await Font.loadAsync({Rajdhani_600SemiBold:Rajdhani_600SemiBold});
    this.setState({fontloaded:true}) 
  }
 
componentDidMount(){
  this.loadfonts();
}


  render() {
    const {fontloaded}=this.state;
    if(fontloaded){
      return <BottomTabNavigator />;
    }
    return null;

    
  }
}
