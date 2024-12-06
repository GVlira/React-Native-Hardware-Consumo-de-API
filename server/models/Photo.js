const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    caption: { type: String, required: true }, // Campo para a legenda da foto
    photo: { type: String, required: true }, // Caminho da imagem
}, { timestamps: true });

module.exports = mongoose.model('Photo', photoSchema);
