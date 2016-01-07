var express = require('express'),
    http = require('http'),

    app = express(),
    port = process.env.PORT || 3000,
    server = http.createServer(app);

app.use(express.static(`${__dirname}/client/build`));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
