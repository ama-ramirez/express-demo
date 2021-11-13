require('dotenv').config();

const {
    PORT,
    JWT_SECRET
} = process.env;

const express = require('express');
const server = express();
const morgan = require('morgan')
server.use(morgan('dev'));
server.use(express.json());

const {
    client,
    getAllItems,
    createItem
} = require('./db');

client.connect();

server.use((req, res, next) => {
    console.log("Someone is accessing our server!");
    next();
})

server.get('/', (req, res, next) => {
    res.send({
        message: "Hello, Server!"
    })
})

const apiRouter = require('./api');
server.use('/api',apiRouter);

server.use((err, req, res, next) => {
    res.send( {
        message: err.message
    });
})

server.listen(PORT, () => {
    console.log("Server is running on ", PORT);
})