const express = require('express');

const morgan = require('morgan');

const bodyParser = require('body-parser');

const app = express();

const router = express.Router();

var items = [{
    todoItemId: 0,
    name: 'an item',
    priority: 3,
    completed: false
}, {
    todoItemId: 1,
    name: 'another item',
    priority: 2,
    completed: false
}, {
    todoItemId: 2,
    name: 'a done item',
    priority: 1,
    completed: true
}];

app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', router);

router
    .route('/')
    .all(function(req, res) {
        res.json({ "status": "ok" });
    });

router
    .route('/api/TodoItems')
    .get(function(req, res, next) {
        res.json(items);
    })
    .post(function(req, res, next) {
        res.status(201).json(req.body);
    })
    .put(function(req, res, next) {
        res.status(201).json(req.body);
    });

router
    .route('/api/TodoItems/:id')
    .get(function(req, res, next) {
        res.json(items[req.params.id]);
    })
    .delete(function(req, res, next) {
        let item = items[req.params.id]
        items.splice(req.params.id, 1);
        res.json(item);
    })

// route handler for requests to /
// app.get('/', function(req, res) {
//     res.json({ "status": "ok" });
// });

// app.get('/api/TodoItems', function(req, res) {
//     res.json(items);
// });

// app.post('/api/TodoItems', function(req, res) {
//     res.status(201).json(req.body);
// });

// app.get('/api/TodoItems/:id', function(req, res) {
//     console.log(req.params.id);
//     res.json(items[req.params.id]);
// });

// app.delete('/api/TodoItems/:id', function(req, res) {
//     let item = items[req.params.id]
//     items.splice(req.params.id, 1);
//     res.json(item);
// });

// app.put('/api/TodoItems', function(req, res) {
//     res.status(201).json(req.body);
// });

module.exports = app;
