const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({"hello": "there"})
})


const PORt = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("App running on port 5000")
});