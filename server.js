const express = require('express');
const cors = require('cors');


const app = express();


app.use(cors())


app.get('/', (req, res) => {
    res
        .status(200)
        .send('Hello server is running')
        .end();
});

app.get('/users/me', (req, res) => {
    res
        .status(200)
        .json({username:"Gilles"})
        .end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});