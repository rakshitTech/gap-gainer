const express = require('express');
const path = require('path');
const expressLogger = require('express-pino-logger')();

const app = express();
const PORT = process.env.PORT || 5000;

const postgre = require('./models/postgre');
const logger = require('./models/logger');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLogger);
app.use(require('./controllers/index'));

app.listen(PORT, () => {
    logger.info(`GAP-GAINER Listening on ${PORT}`);
    postgre.connectToPostgreSql().catch(e => logger.error(e));
});

app.get('/', (req, res) => res.send('cool'));
app.get('/memory_game', (req, res) => res.sendFile(`${__dirname}/views/memory_game/index.html`));
app.get('/memory_game_style', (req, res) => res.sendFile(`${__dirname}/views/memory_game/style.css`));
app.get('/memory_game_js', (req, res) => res.sendFile(`${__dirname}/views/memory_game/app.js`));
