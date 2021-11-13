const express = require('express');
const inventoryRouter = express.Router();

const {
    getAllItems,
    createItem
} = require('../db');

inventoryRouter.use((req, res, next) => {
    console.log("Someone is accessing the inventory!");
    next();
})

inventoryRouter.get('/', async (req, res, next) => {
    try {
        const items = await getAllItems();

        res.send({items});
    } catch (err) {
        next(err);
    }
})

inventoryRouter.post('/', async (req, res, next) => {
    
    try {
        const item = await createItem(req.body);
        
        res.send({
            item
        });
    } catch (err) {
        next(err);
    }
})

inventoryRouter.patch('/', async (req, res, next) => {
    try {
        const items = await getAllItems();

        res.send({items});
    } catch (err) {
        next(err);
    }
})

inventoryRouter.delete('/', async (req, res, next) => {
    
    try {
        const item = await createItem(req.body);
        
        res.send({
            item
        });
    } catch (err) {
        next(err);
    }
})

module.exports = inventoryRouter;