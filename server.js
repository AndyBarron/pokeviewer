const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8080;
const DIST_PATH = path.resolve(__dirname, 'dist');
const HTML_PATH = path.resolve(DIST_PATH, 'index.html');

const app = express();
app.use('/', express.static(DIST_PATH));
app.get('*', (req, res) => res.sendFile(HTML_PATH));

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`);
});
