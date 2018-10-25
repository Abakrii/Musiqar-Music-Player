import React, {Component} from "react";
import {
    View, StyleSheet, Dimensions, ImageBackground , Button} from "react-native";


import backgroundImage from "../../assets/darkone1.jpg";
import Header from './Header';
import TrackDetails from './TrackDetails';
import Controls from './Controls';
import {connect} from "react-redux";

import {updatePatient} from "../../store/actions/index";
import { deletePatient } from "../../store/actions/index";

import Sound from 'react-native-sound'

class MusicDataDetailsScreen extends Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener("change" ,this.updateStyles);
    }

    static navigatorStyle = {
        navBarButtonColor: "#000000"
    };



    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyles);
    }
    updateStyles =(dims)=>{
        this.setState({
            viewMode:
                dims.window.height > 500 ? "portrait" : "landscape",
        });
    };


    render() {

        return (
 <ImageBackground source={backgroundImage}   style={styles.backgroundImage}>

       <View style={styles.container}>
        <Header message="Playing from Charts" />
        <TrackDetails title={this.props.selectedMusic.title}/>
        <Controls
        />

      </View>
 </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container:{

        flex:1,
        justifyContent:"center",
        alignItems:"center",

    },
     backgroundImage:{
        width:"100%",
        flex:1,

    },
    LineStyle: {
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    portraitContainer: {
        flexDirection: "column"
    },
    landscapeContainer: {
        flexDirection: "row"
    },
    visitorDetailContainer: {
        flex: 2
    },
    visitorImage: {
        width: "100%",
        height: "100%"
    },
    patientName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    subContainer: {
        flex: 1
    },
    buttonsHorzStyle: {
        flexDirection: 'row',
        flex: 1
    },
    deleteButton: {
        alignItems: "center"
    },
    PersonalStyle: {
        paddingTop: 10,
        fontSize: 20,
        textAlign: 'center',
        color: '#8b0000',

    },
    bgImage: {
        width:"100%",
        height:"100%"
    },
    landscapeInputContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    portraitInputContainer:{
        flexDirection:"column",
        justifyContent:"flex-start"
    },
    landscapeInputWrapper:{
        width: "45%",
    },
    portraitInputWrapper:{
        width: "100%",
    },
    inputContainer:{
        width:"80%",
    },
    iconStyle: {
        color: '#000',
        fontSize: 30
    },

    buttonText: {
        color: '#000',
        fontSize: 15
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
       // bottom: 90,
        backgroundColor: '#1E90FF',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,

    },
    addButton1: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        top: 10,
        backgroundColor: '#E91E63',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        },
        portraitDateWrapper:{
        width:325
        },
        landscapeDateWrapper:{
        width:225,
        paddingVertical: 10
    },
});
const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        tracks: state.musicProfile.tracks
    };
};
export default connect(mapStateToProps, null)(MusicDataDetailsScreen);


