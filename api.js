import axios from 'axios';

const API_BASE = 'http://192.168.0.101:3000/api/photos';

export const getPhotos = async () => {
    const response = await axios.get(API_BASE);
    return response.data;
};

export const addPhoto = async (photoData) => {
    const response = await axios.post(API_BASE, photoData);
    return response.data;
};
