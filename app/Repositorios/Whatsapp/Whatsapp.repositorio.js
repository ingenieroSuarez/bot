const axios = require('axios');

class WhatsAppRepostorio{
    constructor(){
        this.urlBaseWhatsApp= process.env.URL_BASE_WHATSAPP_API;
        this.tokenWhatsapp=process.env.TOKEN_WHATSAPP_API;
    }
    enviarMensajeTexto(texto, destinatario, numeroApiWhatsapp){
        const url=`${this.urlBaseWhatsApp}${numeroApiWhatsapp}/messages`
        const data={
            "messaging_product": "whatsapp",
            "to": destinatario,
            "text": {"body" : texto}
        }
        const config = {
            maxBodyLength: Infinity,
            headers: {
              Authorization: `Bearer ${this.tokenWhatsapp}`,
              'Content-Type': 'application/json',
            },
        };
        axios.post(url, data, config)
        .catch(error => {
            console.error('Error en el api de WhatsApp:', error);
        });
    }
    enviarArchivo(){

    }
}
module.exports= {
    WhatsAppRepostorio
}