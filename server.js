const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const app = express();

// Static frontend (needed because ES modules don't load from file://)
app.use(express.static(PUBLIC_DIR));
app.get('/', (req, res) => res.redirect('/html/index.html'));

app.listen(PORT, () => console.log(`KedadApp running at http://localhost:${PORT}`));
