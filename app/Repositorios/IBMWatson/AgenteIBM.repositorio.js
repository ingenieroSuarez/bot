const { IamAuthenticator } = require('ibm-watson/auth');
const AssistantV2 = require('ibm-watson/assistant/v2');

const asistenteWatson = new AssistantV2({
    authenticator: new IamAuthenticator({
      apikey: process.env.IBM_KEY,
    }),
    version: process.env.IBM_VERSION,
    serviceUrl: process.env.IBM_URL,
  });

class AgenteIBMRepositorio{
    generarToken(){
        return new Promise((resolve) => {
            let sesionToken;
            asistenteWatson
              .createSession({
                assistantId: process.env.IBM_ASSISTANT_ID,
              })
              .then((res) => {
                sesionToken = res.result.session_id;
                resolve(sesionToken.replace(/['"]+/g, ''));
              })
              .catch((err) => {
                console.log(err)
                sesionToken = null;
              });
            return sesionToken;
          });
    }
    async comunicarConAgente(texto,  token ){
        const respuesta= await asistenteWatson.message({
            assistantId: process.env.IBM_ASSISTANT_ID,
            sessionId: token,
            input: {
              'message_type': 'text',
              'text': texto
              }
            })
            .then(res => {
                const respuesta= res.result.output.generic[0].text
                return respuesta
            })
            .catch(err => {
              console.log(err);
            });
            return respuesta
    }
}
module.exports = {
    AgenteIBMRepositorio
}