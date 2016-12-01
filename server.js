'use strict';
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8080;
const STATIC_PATH = path.join(__dirname, 'static');
const DIST_PATH = path.join(__dirname, 'dist');
const HTML_PATH = path.join(__dirname, 'index.html');

const app = express();
app.use('/static', express.static(STATIC_PATH));
app.use('/dist', express.static(DIST_PATH));
app.get('*', (req, res) => res.sendFile(HTML_PATH));

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`);
});
