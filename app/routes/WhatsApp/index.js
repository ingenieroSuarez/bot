const express = require('express')
const router = express.Router();
const {WhatsAppController} = require('../../controllers/Whatsapp/Whatsapp.controller')

router.get('/messages', async (req, res)=> { 
    const mensajes= await new WhatsAppController().buscarMensajes()
    res.status(200).send(mensajes);
});
router.get('/message/:id', async (req, res)=> { 
    const {id}= req.params;
    const mensajes= await new WhatsAppController().buscarMensajesPorId(id)
    res.status(200).send(mensajes);
});
router.get('/message/:userId/user', async (req, res)=> {
    const {userId}= req.params
    const mensajes= await new WhatsAppController().buscarMensajesPorUsuario(userId)
    res.status(200).send(mensajes);
});
router.post("/messages", function (request, response) {
    try {
        const datosMensaje= request.body.entry[0].changes[0].value;
        const { statuses, contacts, messages, metadata  } = datosMensaje
        const conversacion= new WhatsAppController();
        conversacion.construirRespuesta(statuses, contacts, messages, metadata);
    } catch (error) {
        response.status(500).send({ message: `error interno` });
    }
    response.sendStatus(200);
});

router.put('/messages', async (req, res)=> {
    const id = req.query?.id;
    const plantilla= req.body?.template;
    if(!id) return res.status(403).send({ message: `se requiere 'id' ` });
    if(!plantilla) return res.status(403).send({ message: `se requiere 'template' ` });
    console.log(plantilla);
    res.status(200).send("")
});

module.exports= router