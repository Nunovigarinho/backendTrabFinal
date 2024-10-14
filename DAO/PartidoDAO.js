import conectar from "./conexao.js";
import Partido from "../Modelo/Partido.js";
export default class PartidoDAO{
    //Essa classe se responsabiliza por gravar, alterar, excluir e consultar partidos no banco de dados

    constructor(){
        this.init(); //iniciailizar o banco de dados
    }
   
    async init(){
        try{
        const conexao = await conectar();
        const sql = `CREATE TABLE IF NOT EXISTS backendtrabfinal(
                nome VARCHAR(33) NOT NULL PRIMARY KEY, 
                sigla VARCHAR(3) NOT NULL, 
                numeroderegistro VARCHAR(6) NOT NULL);`;
        await conexao.execute(sql);
        await global.poolConexoes.releaseConnection(conexao);
        console.log ("Banco de dados iniciado com sucesso!")   
    }   catch (erro){
        console.log("Banco de dados não pode ser iniciado!");
    }
       
    } 
    async incluir(partido){
        if (partido instanceof Partido){
            const conexao = await conectar();
            const sql = `INSERT INTO partido(nome,sigla,numeroderegistro) 
                         VALUES (?, ?, ?);`;
            const parametros = [
                partido.nome,  
                partido.sigla, 
                partido.numeroderegistro, 
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }
    async alterar(partido) {
       if (partido instanceof Partido) {
           const conexao = await conectar();
           const sql = `UPDATE partido SET 
            nome = ?, 
            sigla = ?, 
            numeroderegistro = ?
                          WHERE nome = ?;`;  // Atualiza o registro com base no nome
         const parametros = [
            partido.nome,
           partido.sigla,
            partido.numeroderegistro,
            partido.nome  // Nome do partido para identificar o registro a ser alterado
        ];
       await conexao.execute(sql, parametros);
       await global.poolConexoes.releaseConnection(conexao);
      }
 }
    async excluir(partido){
        if (partido instanceof Partido){
          const conexao = await conectar();
          const sql = `DELETE FROM partido WHERE nome = ?;`
          const parametros = [
           partido.nome
          ];
            await conexao.execute(sql,parametros);
         await global.poolConexoes.releaseConnection(conexao);
    }
    }
    async consultar(termoBusca){
        let sql = "";
        let parametros = [];
        if (termoBusca){ //se o termo de busca existir, busca será por nome
            sql = `SELECT * FROM partido WHERE nome = ? ORDER BY nome;`;
            parametros.push(termoBusca);
        }
        else{
            sql = `SELECT * FROM partido ORDER BY nome;`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,parametros);
        let listaPartidos = [];
        for (const registro of registros){
            const partido = new Partido(
                registro.nome,
                registro.sigla,
                registro.numeroderegistro
            );
            listaPartidos.push(partido);
        }
        await global.poolConexoes.releaseConnection(conexao);
        return listaPartidos;

    }

}