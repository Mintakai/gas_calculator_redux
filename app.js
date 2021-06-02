const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3000;
const router = require('./routes/index');

const file = "./private/resources/carlist.json";

var carlist = JSON.parse(fs.readFileSync(file));

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('carlist', carlist);

app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;