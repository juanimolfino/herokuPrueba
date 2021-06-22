// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors');
const path = require('path');

var cors = require('cors')



// Create a new express application named 'app'
const app = express();
app.use(cors());
// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;

// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
// Este middleware a nivel de aplicación imprime las solicitudes entrantes en la consola del servidor, lo que resulta útil para ver las solicitudes entrantes. 
app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

// Configure the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



// Require Route - Esto importa y configura nuestra aplicación para usar las rutas que se definen en rutas.js.
const api = require('./routes/routes');
// Configure app to use route
app.use('/api/v1/', api); // http://localhost:5000/api/v1/say-something



// This middleware informs the express application to serve our compiled React files
// Este middleware informa a la aplicación express para que sirva nuestros archivos React compilados
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});

// Configure our server to listen on the port defiend by our port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));