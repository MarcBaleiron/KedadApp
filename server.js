const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;
const APP_DIR = path.join(__dirname, 'src', 'app');

const app = express();

// Static frontend (needed because ES modules don't load from file://)
app.use(express.static(APP_DIR));
app.get('/', (req, res) => res.redirect('/html/index.html'));

app.listen(PORT, () => console.log(`KedadApp running at http://localhost:${PORT}`));
