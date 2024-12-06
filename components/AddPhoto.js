import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Alert, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const AddPhoto = ({ navigation }) => {
    const [photo, setPhoto] = useState(null);
    const [caption, setCaption] = useState('');

    // Função para escolher uma imagem da galeria
    const handlePickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.status !== 'granted') {
            Alert.alert('Permissão de Galeria', 'Permissão para acessar a galeria é necessária!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };

    // Função para confirmar e adicionar a foto
    const handleConfirm = async () => {
        if (!photo || !caption) {
            Alert.alert('Erro', 'Por favor, adicione uma foto e uma legenda.');
            return;
        }

        const formData = new FormData();
        formData.append('photo', {
            uri: photo,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });
        formData.append('caption', caption);

        try {
            const response = await axios.post('http://192.168.0.101:3000/photos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) { // Alterado para verificar o código 201
                Alert.alert('Sucesso', 'Foto adicionada com sucesso!');
                navigation.navigate('PhotoFeed'); // Volta para o PhotoFeed
            } else {
                Alert.alert('Erro', response.data.message || 'Algo deu errado!');
            }
        } catch (error) {
            console.error('Erro ao adicionar foto:', error);
            Alert.alert('Erro', 'Não foi possível adicionar a foto.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Foto</Text>
            {photo && <Image source={{ uri: photo }} style={styles.imagePreview} />}
            <Button title="Escolher Foto" onPress={handlePickImage} />
            {photo && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Adicione uma legenda..."
                        value={caption}
                        onChangeText={setCaption}
                    />
                    <Button title="Confirmar" onPress={handleConfirm} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 16,
        resizeMode: 'cover',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
    },
});

export default AddPhoto;
