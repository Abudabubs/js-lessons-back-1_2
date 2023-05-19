const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

// Промежуточное ПО для обработки данных в формате JSON
app.use(bodyParser.json());

// Массив для хранения ToDo
let todos = [];

// Получить список всех ToDo
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// Получить ToDo по id
app.get('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: 'ToDo not found' });
    }
});

// Создать новый ToDo
app.post('/api/todos', (req, res) => {
    const { title, description } = req.body;

    const newTodo = {
        id: uuidv4(),
        title,
        description,
        isDone: false
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});

// Редактировать ToDo по id
app.patch('/api/todos/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, isDone } = req.body;

    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        if (title) todo.title = title;
        if (description) todo.description = description;
        if (isDone !== undefined) todo.isDone = isDone;

        res.json(todo);
    } else {
        res.status(404).json({ error: 'ToDo not found' });
    }
});

// Удалить ToDo по id
app.delete('/api/todos/:id', (req, res) => {
    const id = req.params.id;

    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
        todos.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.status(404).json({ error: 'ToDo not found' });
    }
});

// Удалить ВСЕ ToDo
app.delete('/api/todos', (req, res) => {
    todos = [];
    res.sendStatus(204);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});