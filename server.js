const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3100;

app.use(bodyParser.json());

// GET /sum
app.get('/sum', (req, res) => {
   

    const { a, b } = req.query;

    if (isNaN(a) || isNaN(b)) {
        res.status(400).json({ error: 'error' });
    } else {
        const sum = Number(a) + Number(b);
        res.json({ result: sum });
    }
});

// POST /reverse-case
app.post('/reverse-case', (req, res) => {
    const { text } = req.body;
    const reversedText = text.split('').map(char => {
        if (char === char.toUpperCase()) {
            return char.toLowerCase();
        } else {
            return char.toUpperCase();
        }
    }).join('');

    res.json({ result: reversedText });
});

// PUT /obj-to-array
app.put('/obj-to-array', (req, res) => {
    const { obj } = req.body;
    const objArray = Object.entries(obj).map(([key, value]) => {
        return { key, value };
    });

    res.json({ result: objArray });
});

// PATCH /reverse-array
app.patch('/reverse-array', (req, res) => {
    const { array } = req.body;
    const reversedArray = array.reverse();

    res.json({ result: reversedArray });
});

// DELETE /duplicates
app.delete('/duplicates', (req, res) => {
    const { array } = req.body;
    const uniqueArray = Array.from(new Set(array));

    res.json({ result: uniqueArray });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
