const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dialogFlowRoute = require("./routes/dialogFlowRoute")

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send({"hello": "there"})
})

require('./routes/dialogFlowRoute')(app);
// app.use('/api/df_text_query', dialogFlowRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("App running on port 5000")
});

// module.exports = app;