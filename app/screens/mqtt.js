import React, { Component } from 'react';
import init from 'react_native_mqtt';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert
 } from 'react-native';

 import {AsyncStorage} from 'react-native-storage';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});


export default class MQTT extends Component {

  constructor(){
    super();
    this.onMessageArrived = this.onMessageArrived.bind(this)
    this.onConnectionLost = this.onConnectionLost.bind(this)


    const client = new Paho.MQTT.Client('broker.emqx.io',1883,'1',);
    client.onMessageArrived = this.onMessageArrived;
    client.onConnectionLost = this.onConnectionLost;
    client.connect({ 
      onSuccess: this.onConnect,
      useSSL: false ,
      userName: 'emqx',
      password: 'publix',
      onFailure: (e) => {console.log("here is the error" , e); }

    });

    this.state = {
      message: [''],
      client,
      messageToSend:'',
      isConnected: false,
    };

  }


  onMessageArrived(entry) {
    console.log("onMessageArrived:"+message.payloadString);
    this.setState({message: [...this.state.message, entry.payloadString]});

  }


  onConnect = () => {
    const { client } = this.state;
    console.log("Connected!!!!");
    client.subscribe('/HOMELOCK/FIRST');
    this.setState({isConnected: true, error: ''})
  };


  sendMessage(){
    message = new Paho.MQTT.Message(this.state.messageToSend);
    message.destinationName = "hello/world";

    if(this.state.isConnected){
      this.state.client.send(message);    
    }else{
      this.connect(this.state.client)
        .then(() => {
          this.state.client.send(message);
          this.setState({error: '', isConnected: true});
        })
        .catch((error)=> {
          console.log(error);
          this.setState({error: error});
        });
  }
  }


  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
      this.setState({error: 'Lost Connection', isConnected: false});
    }
  }




  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.welcome}>
          Welcome to React Native MQTT!
        </Text>
        <Text style={styles.instructions}>
          Message: {this.state.message.join(' --- ')}
        </Text>
        <Text style={{color: 'red'}}>
          {this.state.error}
        </Text>
        { this.state.isConnected ?
            <Text style={{color: 'green'}}>
              Connected
            </Text> : null
        }
        <TextInput
          value={this.state.messageToSend} 
          onChangeText={(value => this.setState({messageToSend: value}))} 
          placeholder="Type hereee..."
          style={styles.input} />
        <Button onPress={this.sendMessage.bind(this) } title="Send Message" />

      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: 'blue',
  },
  input:{
    width: 300
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});