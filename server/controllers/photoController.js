const Photo = require('../models/Photo');

// Obter todas as fotos
exports.getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find();
        res.json(photos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Criar uma nova foto
exports.createPhoto = async (req, res) => {
    const { caption } = req.body; // Agora só recebemos a legenda
    const photoUrl = req.file.path;

    const newPhoto = new Photo({
        caption, // Legenda da foto
        photoUrl // Caminho da imagem que o multer salvou
    });

    try {
        const savedPhoto = await newPhoto.save();
        res.status(201).json(savedPhoto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Atualizar uma foto
exports.updatePhoto = async (req, res) => {
    try {
        const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPhoto);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Deletar uma foto
exports.deletePhoto = async (req, res) => {
    try {
        await Photo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Foto deletada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
