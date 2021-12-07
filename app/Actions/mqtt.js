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


