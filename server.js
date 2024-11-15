const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.port || '3000';

// Setarea locației și a numelui fișierului
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Servește fișierele statice (pentru a servi pagina HTML)
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Ruta pentru încărcarea imaginii
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nu s-a încărcat nicio imagine.');
    }
    res.send(`Imaginea a fost încărcată cu succes!<br><img src="/uploads/${req.file.filename}" alt="Image">`);
});

// Lansează serverul
app.listen(port, () => {
    console.log(`Serverul rulează pe http://localhost:${port}`);
});
