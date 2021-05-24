const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const router = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;