const express = require('express');
usersRouter = express.Router();

const {
    getAllItems,
    createItem
} = require('../db');

usersRouter.use((req, res, next) => {
    console.log("Someone is accessing the users!");
    next();
})

usersRouter.get('/', async (req, res, next) => {
    try {
        const items = await getAllItems();

        res.send({items});
    } catch (err) {
        next(err);
    }
})

usersRouter.post('/', async (req, res, next) => {
    
    try {
        const item = await createItem(req.body);
        
        res.send({
            item
        });
    } catch (err) {
        next(err);
    }
})

usersRouter.patch('/', async (req, res, next) => {
    try {
        const items = await getAllItems();

        res.send({items});
    } catch (err) {
        next(err);
    }
})

usersRouter.delete('/', async (req, res, next) => {
    
    try {
        const item = await createItem(req.body);
        
        res.send({
            item
        });
    } catch (err) {
        next(err);
    }
})

module.exports = usersRouter;