const express = require("express");

const app = express()
app.use(express.static('public'));
app.use('/build', express.static('build'))
const port = 3001;
app.listen(port, () => console.log(`Listening in port ${port}`))