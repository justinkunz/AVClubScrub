var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/apiRoutes')(app)


app.listen(PORT)

