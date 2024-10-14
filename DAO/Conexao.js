import mysql from 'mysql2/promise';

export default async function conectar(){
    if(global.poolConexoes){
        return await global.poolConexoes.getConnection();
    }
    else{
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root', //deve ser desencorajado
            port: 3306,
            password: '',
            database: 'backendtrabfinal',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // máximo de conexões inativas, o valor padrão é o mesmo que `connectionLimit`
            idleTimeout: 60000, // tempo limite de conexões inativas, em milissegundos, o valor padrão 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
          });

          global.poolConexoes = pool;

          return await global.poolConexoes.getConnection();
}

}
