const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dialogFlowRoute = require("./routes/dialogFlowRoute")

app.use(bodyParser.json())

require('./routes/dialogFlowRoute')(app);
// app.use('/api/df_text_query', dialogFlowRoute);

if (process.env.NODE_ENV === 'production') {
    // js and css files
    app.use(express.static('client/build'));

    // index.html for all page routes
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("App running on port 5000")
});

// module.exports = app;