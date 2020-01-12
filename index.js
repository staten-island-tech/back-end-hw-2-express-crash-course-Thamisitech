const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./MIDDLEWARE/logger');
const members = require('./Members.js');
const app = express();


// INIT MIDDLEWARE
// app.use(logger);

//HANDLEBARS MIDDLEWARE
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// app.get('/', (req, res) =>{
//     // res.send('<h1>Hello World!!!</h1>');
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

//BODY PARSER MIDDLE WARE
app.use(express.json());
app.use(express.urlencoded({ extended:false}));


//HOMEPAGE ROUTE
app.get('/',(req, res)=> res.render('index', {
    title: 'Member App',
    members
}));



// SET A STATIC FOLDER

app.use(express.static(path.join(__dirname, 'public')));

//Members API Routes
app.use('/api/members', require('./Routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));