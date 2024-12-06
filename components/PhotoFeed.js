import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const PhotoFeed = ({ navigation }) => {
    const [photos, setPhotos] = useState([]);

    // Função para buscar fotos do backend
    const fetchPhotos = async () => {
        try {
            const response = await axios.get('http://192.168.0.101:3000/photos');
            setPhotos(response.data);
        } catch (error) {
            console.error('Erro ao buscar fotos:', error);
        }
    };

    // Busca fotos quando o componente é montado
    useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={photos}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.photoItem}>
                        <Image source={{ uri: item.photoUrl }} style={styles.photo} />
                        <Text style={styles.caption}>{item.caption}</Text>
                    </View>
                )}
            />
            {/* Botão Flutuante */}
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => navigation.navigate('AddPhoto')}
            >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    photoItem: {
        marginBottom: 16,
        alignItems: 'center',
    },
    photo: {
        width: '90%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    caption: {
        marginTop: 8,
        fontSize: 16,
        color: '#333',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#007BFF',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default PhotoFeed;
