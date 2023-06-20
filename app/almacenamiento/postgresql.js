
const { Client } = require('pg');

const clientePostgreSQL = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });
  let conexionBd;
    async function conectarBaseDeDatos() {
        try {
            conexionBd = await clientePostgreSQL.connect();
            console.log("conectado BD");
        } catch (error) {
            console.log("Error al conectar a la base de datos");
        }
    }
    conectarBaseDeDatos();


module.exports = {
    clientePostgreSQL,
};

