const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/express-demo');

async function createItem ({name, price, stock}) {
    try {
        const { rows: [item ] } = await client.query(`
            INSERT INTO inventory (name, price, stock)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,[name, price, stock]);

        return item;
    } catch (err) {
        throw err;
    }
}

async function getAllItems () {
    try {
        const { rows: items } = await client.query(`
            SELECT * FROM inventory;
        `);

        return items;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    client,
    createItem,
    getAllItems
}

// plain js

// `There is text here and a ${ variable } there!`

// react

// <h1>There is text here and a { variable } there!</h1>

//PSQL