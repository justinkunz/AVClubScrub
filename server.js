var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
require('./routes/apiRoutes')(app)

app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT)

