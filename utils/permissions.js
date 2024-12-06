import * as Camera from 'expo-camera';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'É necessário permitir o acesso à câmera.');
        return false;
    }
    return true;
};

export const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'É necessário permitir o acesso à localização.');
        return false;
    }
    return true;
};
