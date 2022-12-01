const express = require('express');
const app = express();
const serverName = 'EPA Server'
const PORT = 1960;

app.listen(PORT || 4000, ()=>{
    console.log(`${serverName} listening on port ${PORT}`)
})