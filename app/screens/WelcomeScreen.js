import React from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../Config/colors'
function WelcomeScreen(props) {
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
            <View style={styles.Permission}>
                <Button title = "Reject" color = {colors.secondary}></Button>
                <Button title = "Allow" color = {colors.primary}></Button>
            </View>
            
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