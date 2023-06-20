const {AgenteIBMRepositorio} = require('../../Repositorios/IBMWatson/AgenteIBM.repositorio')

class AgenteConversacionalServicio{
    constructor(){
        this.agente= new AgenteIBMRepositorio()
    }
    async enviarMensajeAlAgente(texto){
        const token= await this.agente.generarToken();
        return await this.agente.comunicarConAgente(texto, token);
    }
}

module.exports = { AgenteConversacionalServicio }