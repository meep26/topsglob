const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const passport = require('passport');

const app = express();

const keys = require('./config/keys');
const port = process.env.PORT || 5000;

const usersRoute = require('./routes/api/users');
const postsRoute = require('./routes/api/posts');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(passport.initialize());
require('./config/passport')(passport);

app.use(expressValidator());

app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
   // Set static folder
   app.use(express.static('client/build'));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

app.use( (err, req, res, next) => {
   const status = err.statusCode || 500;
   const msg = err.msg || 'Something wen\'t wrong';
   res.status(status).json({
      errors: (typeof err.msg === 'object') ? (msg) : msg.toString(),
      status: status
   });
});

mongoose.connect(
   keys.mongoURI,
   {
      useNewUrlParser: true
   }
)
.then(() => console.log('Connected to database'))
.catch(err => console.log(err));

app.listen(port, () => {
   console.log(`Server running in port ${port}`);
});