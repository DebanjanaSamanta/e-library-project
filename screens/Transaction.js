import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity,ImageBackground,Image } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

const bgImage= require('../assets/background2.png');
const appIcon= require('../assets/appIcon.png');
const appName= require('../assets/appName.png');

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      bookId: "",
      studentId:""
    };
  }

  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    const {domState}=this.state;
    if(domState==='bookId'){
      this.setState({
        bookId: data,
        domState: "normal",
        scanned: true
      });
    }
    else if(domState==='studentId'){
      this.setState({
        studentId: data,
        domState: "normal",
        scanned: true
      });
    }
    
  };

  render() {
    const { domState, hasCameraPermissions, bookId,studentId, scanned } = this.state;
    if (domState !=='normal') {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    return (
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.bgImage}>
          <View style={styles.upperContainer}>
            <Image source={appIcon} style={styles.appIcon}></Image>
            <Image source={appName} style={styles.appName} ></Image>
          </View>
          <View style={styles.lowerContainer}>
          <View style={styles.textinputContainer}>
              <TextInput style={styles.textInput}
              placeholder={"bookId"}
              placeholderTextColor={"black"}
              value={"bookId"}
             />
                <TouchableOpacity
          style={[styles.scanbutton, { marginTop: 25 }]}
          onPress={() => this.getCameraPermissions("bookId")}
        >
          <Text style={styles.scanButtonText}>Scan</Text>
        </TouchableOpacity>

              
            </View>

            <View style={styles.textinputContainer}>
              <TextInput style={styles.textInput}
              placeholder={"student Id"}
              placeholderTextColor={"black"}
              value={"studentId"}
             />
                <TouchableOpacity
          style={[styles.button, { marginTop: 25 }]}
          onPress={() => this.getCameraPermissions("studentId")}
        >
          <Text style={styles.scanButtonText}>Scan</Text>
        </TouchableOpacity>

              
            </View>


          </View>
        </ImageBackground>
       
        
          <Text style={styles.buttonText}>Scan QR Code</Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },

  bgImage:{
    flex:1,
    resizeMode:'cover',
    justifyContent:"center",
  },

  upperContainer:{
    flex:0.5,
    justifyContent:"center",
    alignItems:'center'
  },

  appIcon:{
    width:200,
    height:200,
    resizeMode:'contain',
    marginTop:80
  },

  appName:{
    width: 200,
    height:200,
    resizeMode:"center",
    marginTop:80
  },

  lowerContainer: {
  flex:0.5,
  alignItems:'center',
  },

  textInput:{
    width:"57%",
    height:50,
    padding:10,
    borderColor:'#FFFFFF',
    borderRadius:10,
    borderWidth:3,
    fontSize:18,
    backgroundColor:"#5653D24",
    fontFamily:'Rajdhani_600SemiBold',
    color:"#FFFFFF"
  },
  

  scanbutton: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DFD24",
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
  },
  scanButtonText: {
    fontSize: 24,
    color: "##0A0101",
    fontFamily:"Rajdhani_600SemiBold"
  },
});
