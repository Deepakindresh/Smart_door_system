import React from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import colors from '../Config/colors'
import init from 'react_native_mqtt';
import { AsyncStorage } from 'react-native-storage';


init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    reconnect: true,
    sync : {

    }
});


function onMessageArrived(message){
    console.log("onMessageArrived:",message.payloadString)
}

function WelcomeScreen(props) {
    // const client  = new Paho.MQTT.Client('broker.emqx.io',1883,'1')
    // client.onMessageArrived = onMessageArrived;
    // client.connect({onSuccess:()=>{console.log("Connectd");client.subscribe("/HOMELOCK/FIRST")}})
    // console.log("Hello dei")
    const createTwoButtonAlert = () =>
    Alert.alert('Stranger waiting...', 'Stranger is safe to meet, would you like to allow?', [
      {
        text: 'Reject',
        onPress: () => console.log('Did not allow stranger'),
        style: 'cancel',
      },
      { text: 'Allow', onPress: () => console.log('Allowed stranger') },
    ]);

    return (
        <ImageBackground
        blurRadius={5}
        style={styles.background}
        source = {require('../assets/background.jpg')}
        >
            <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../assets/logo_gold.png")}/>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20, position: 'relative', top: 180}}>Smart Door System</Text>
            </View>
            <View style={styles.Notification}>
                <Button title={'Check notifications'} onPress={createTwoButtonAlert} />
            </View>
            {/* <View style={styles.Permission}>
                <Button title = "Reject" color = {colors.secondary}></Button>
                <Button title = "Allow" color = {colors.primary}></Button>
            </View> */}
            
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        resizeMode: 'stretch',
    },
    allowButton:{
        width: '50%',
        height: 70,
        backgroundColor: colors.primary,
    },

    rejectButton:{
        width: '50%',
        height: 70,
        backgroundColor: colors.secondary,
    },
    logo:{
        width: 100,
        height: 100,
        position: 'absolute',
        top: 70,
    },
    logoContainer:{
        position: 'absolute',
        top: 30,
        alignItems: 'center',
    },
    Notification:{
        bottom: '15%',
    },
    Permission:{
        flex: 0.05,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        bottom: 100,
    }
});
export default WelcomeScreen;