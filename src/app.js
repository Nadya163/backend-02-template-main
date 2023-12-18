const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./routes/usersRoutes');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRouter = require('./routes/bookRoutes');
const LoggerOne = require('./middlewares/logger');

dotenv.config();

const { 
    PORT = 3005,
    API_URL = "http://127.0.0.1",
    MONGO_URL = "mongodb://localhost:27017/backend"
     } = process.env;

mongoose.connect(MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
});

const app = express();

const HelloWorld = (request, response) => {
    response.status(200);
    response.send('Hello world!');
};

app.get('/', HelloWorld)
app.use(cors());
app.use(bodyParser.json());
app.use(LoggerOne);

app.post('/', (request, response) => {
    response.status(200);
    response.send('Hello from POST');
} )

app.use(userRouter);
app.use(bookRouter);

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
})