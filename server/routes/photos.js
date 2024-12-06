const express = require('express');
const router = express.Router();
const { getAllPhotos, createPhoto, updatePhoto, deletePhoto } = require('../controllers/photoController');
const multer = require('multer');
const path = require('path');

// Configuração do multer para armazenar as imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Diretório onde as imagens serão armazenadas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada imagem
    },
});
const upload = multer({ storage: storage });

// Rotas para fotos
router.get('/photos', getAllPhotos); // Rota para obter todas as fotos
router.post('/photos', upload.single('photo'), createPhoto); // Rota para criar uma nova foto
router.put('/photos/:id', upload.single('photo'), updatePhoto); // Rota para atualizar uma foto
router.delete('/photos/:id', deletePhoto); // Rota para deletar uma foto

module.exports = router;
