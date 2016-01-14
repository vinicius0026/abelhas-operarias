var express = require('express'),
    http = require('http'),

    app = express(),
    server = http.createServer(app);

app.use(express.static(`${__dirname}/client/build`));

require('./server/app.js')(app);
