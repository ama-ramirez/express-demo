const {
    client,
    createItem,
    getAllItems
} = require('./index');

async function dropTables () {
    console.log("Dropping tables!");

    try {
        await client.query(`
            DROP TABLE IF EXISTS inventory;
        `);

        console.log("Done!");
    } catch (err) {
        console.log("Error dropping tables!");
        throw err;
    }
}

async function createTables () {
    console.log("Creating tables!");

    try {
        await client.query(`
            CREATE TABLE inventory (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                price INTEGER NOT NULL,
                stock INTEGER DEFAULT 0
            );
        `);

        console.log("Done!");
    } catch (err) {
        console.log("Error creating tables!");
        throw err;
    }
}

async function rebuildDB () {
    console.log("Rebuilding database!");
    const itemData = [
        {
            name: 't-shirt',
            price: 25,
            stock: 30
        },
        {
            name: 'hat',
            price: 25,
            stock: 30
        },
        {
            name: 'bracelet',
            price: 25,
            stock: 30
        }
    ]

    try {
        client.connect();

        await dropTables();
        await createTables();

       await Promise.all(itemData.map(item => createItem(item))).then(response => response).catch(err => {throw err});
        const data = await getAllItems();
        console.log(data);
    } catch (err) {
        console.log("Uh oh!");
        console.error(err);
    } finally {
        console.log("Finished building database!");
        client.end();
    }
}

rebuildDB();