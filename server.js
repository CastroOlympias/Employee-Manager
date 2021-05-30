const express = require('express');
const db = require('./db/connection');
// Import index route hub
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.allowedNodeEnvironmentFlags.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// this will concatanate the api endpoints from the imported apiRoutes index route hub
app.use('/api', apiRoutes);


// Default (catchall) response for any other request (NOT FOUND)
app.use((req, res) => {
    res.status(404).end();
});

// Start the server after the database connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
