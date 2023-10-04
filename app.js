const express = require('express');
const app = express();
const path = require('path');
const outputRoute = require('./routes/output')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', outputRoute);



app.listen(3000, () => {
    console.log('Using port 3000')
})