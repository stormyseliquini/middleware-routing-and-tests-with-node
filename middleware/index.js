const express = require('express');

const morgan = require('morgan');

const app = express();

var requestCount = 0;

app.use(morgan('dev'));

// custom middleware, counts requests
app.use(function(req, res, next) {
    requestCount++
    console.log('request number: ' + requestCount);
    next();
});

app.use(function(req, res, next) {
    if (req.get('auth') === 'opensesame') {
        next();
    } else {
        res.status(403).send();
    }
})




app.get('/', function(req, res) {
    res.status(200).send('Hello World');
});
app.listen(3000, function() {
    console.log('listening on port 3000');
});
