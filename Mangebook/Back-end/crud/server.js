const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();  // Carregar variáveis de ambiente


// Inicialização do app
const app = express();
app.use(cors());
app.use(express.json());


// Conexão ao MongoDB
mongoose.connect('mongodb+srv://CauaMoura9:caua9@library.9fjwj.mongodb.net/library')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Importação das rotas
const booksRoutes = require('./routes/books');
app.use('/api/books', booksRoutes);

const path = require('path');

// Serve os arquivos estáticos do front-end
app.use(express.static(path.join(__dirname, 'dist')));

// Rota "catch-all" para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const adminRoutes = require('./routes/admin');
app.use(adminRoutes);

// Definir a porta do Servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
