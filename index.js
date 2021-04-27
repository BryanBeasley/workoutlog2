require('dotenv').config();

const Express = require('express');
const database = require('./db');
const userController = require('./controllers/userController');
const logBookController = require('./controllers/logController');
const validate = require('./middleware/validateSession');

const app = Express();

app.use(require('./middleware/headers'));
app.use(Express.json());

app.use('/user', userController);
app.use('/log', logBookController);

database.sync();

app.listen(process.env.PORT, () => console.log(`[${process.env.PORT}]: Listening on this port`));



// *****************
// everything below this app.use (app.use(validate);) 
// will require validation in order to be accessed, everything above will not require a token 
//! commented out for possible future use
// TODO app.use(validate);
// ******************



