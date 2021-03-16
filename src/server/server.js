const express = require('express');
const app = express();

app.use(express.static('dist'));

// api routes
app.use('/', require('./routes'));

// start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}!`));
