import db from "./database/config";

const express = require('express');

const app = express();
const PORT = 3000;

db.sequelize.authenticate()
 .then(() => console.log('Database connected'))
 .catch((err) => console.error('Error connecting to database:', err));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the REST API! 1');
});

db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
      console.log("server is successfully running!");
    });
});
