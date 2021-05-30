
const express = require('express');
const app = express();
const exphbs= require('express-handlebars');
//const cors = require('cors');
//const { AsyncResource } = require('node:async_hooks');
app.use(express.static('public'))

//HandleBars wasnt used
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



// middleware
//app.use(cors());
app.use(express.json());      //req.body
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'))






app.listen(3000, () => {
  console.log("server has started on port 3000");
});
