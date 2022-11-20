const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const {v2} = require('cloudinary')
const cors = require('cors');
const dbConnect = require('./config/dbConnect.js');
const taskRoutes = require('./routes/task');

const app = express();
app.use(express.json());
app.use(cors());

//! Конфиги для Cloudinary
v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

//! Подключение к MONGO DB
dbConnect();

//! Роуты
app.use('/api', taskRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Запрущен сервер');
});