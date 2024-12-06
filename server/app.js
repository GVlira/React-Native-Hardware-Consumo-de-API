const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const photoRoutes = require('./routes/photos');
const cors = require('cors');
const path = require('path'); 
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Conexão ao MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error(err));

// Rotas
app.use('/api', photoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
