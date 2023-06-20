const { MensajesRepositorio }= require('../../Repositorios/Mensajes/mensajes.repositorio')
const { WhatsAppRepostorio } = require("../../Repositorios/Whatsapp/Whatsapp.repositorio")
const { AgenteConversacionalServicio } = require('../../Servicios/Agente/Agente-conversacional.servicio')

class WhatsAppController {
    constructor(){
        this.whatsappRepositorio = new WhatsAppRepostorio();
        this.servicioAgente= new AgenteConversacionalServicio();
        this.mensajesRepositorio= new MensajesRepositorio();
    }
    async construirRespuesta(estado, contacto, mensaje, metadata){
        if(mensaje===undefined) return false;
        const texto= mensaje[0].text.body;
        const remitente= mensaje[0].from;
        const numeroApiWhatsapp=metadata.phone_number_id;
        const idMensaje= mensaje[0].id;
        const tipoMensaje= mensaje[0].type;
        const respuesta= await this.servicioAgente.enviarMensajeAlAgente(texto);
        const entidad={
            mensaje: texto,
            remitente : remitente,
            destinatario : numeroApiWhatsapp,
            idMensaje : idMensaje,
            tipoMensaje : tipoMensaje,
            respuesta : respuesta
        };
        this.whatsappRepositorio.enviarMensajeTexto(respuesta, remitente, numeroApiWhatsapp)
        this.mensajesRepositorio.registrarMensaje(entidad);
    }
    async buscarMensajes(){
        return await this.mensajesRepositorio.consultarMensajes();
    }
    async buscarMensajesPorId(id){
        return await this.mensajesRepositorio.consultarMensajesPorId(id);
    }
    async buscarMensajesPorUsuario(idUsuario){
        return await this.mensajesRepositorio.consultarMensajesPorUsuario(idUsuario);
    }
    async reiniciarConversacion(){

    }
}
module.exports= {
    WhatsAppController
}