const express = require('express');
const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
    console.log("Someone is accessing the API!");
    next();
})

apiRouter.get('/', (req, res, next) => {
    res.send({message: "Hello, API!"});
})

const inventoryRouter = require('./inventory');
apiRouter.use('/inventory', inventoryRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;