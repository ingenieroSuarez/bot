const express = require('express')
const router = express.Router();

router.get('/messages', async (req, res)=> { 
    const mensajes= "mensajes slack"
    res.status(200).send(mensajes);
});
router.post("/messages", function (request, response) {
    response.sendStatus(200);
});

module.exports= router