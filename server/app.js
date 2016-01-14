module.exports = function (app) {

    require('./config/express')(app);

    var port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
};
