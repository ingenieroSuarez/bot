const { clientePostgreSQL } = require('../../almacenamiento/postgresql')
class MensajesRepositorio{
    async consultarMensajesPorUsuario(remitente){
        try {
            const respuesta = await clientePostgreSQL.query(`SELECT id, destinatario, remitente, mensaje, "tipoMensaje", respuesta FROM mensajes where remitente='${remitente}'`);
            return respuesta.rows
        } catch (error) {
            console.log(error);
        }
    }
    async consultarMensajes(){
        try {
            const resultado = await clientePostgreSQL.query('SELECT id, destinatario, remitente, mensaje, "tipoMensaje", respuesta FROM mensajes');
            return resultado.rows
        } catch (error) {
            console.log(error);
        }
    }
    async consultarMensajesPorId(id){
        try {
            const respuesta = await clientePostgreSQL.query(`SELECT id, destinatario, remitente, mensaje, "tipoMensaje", respuesta FROM mensajes where id='${id}'`);
            return respuesta.rows
        } catch (error) {
            console.log(error);
        }
    }
    async registrarMensaje(entidad){
        try {
            await clientePostgreSQL.query( `INSERT INTO mensajes (
                id, destinatario, remitente, mensaje, "tipoMensaje", respuesta)
                VALUES ('${entidad.idMensaje}', '${  entidad.destinatario  }', '${entidad.remitente }', '${ entidad.mensaje }', '${ entidad.tipoMensaje }', '${entidad.respuesta }')` );;
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = { MensajesRepositorio}