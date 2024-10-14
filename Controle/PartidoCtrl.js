import Partido from "../Modelo/Partido.js";
export default class PartidoCtrl{
    // os metodos abaixos serão chamados a partir de requisições vindas da internet
    //os metodos serao capazes de manipular as requisições HTTP e produzir respostas HTTP
    
 //irá processar requisições HTTP do tipo POST
 incluir(requisicao, resposta){
    //recebemos uma requisição HTTP do tipo POST e ela é do tipo JSON
    if (requisicao.method == "POST" && requisicao.is("application/json")){
        const dados = requisicao.body;
        const nome = dados.nome;
        const sigla = dados.sigla;
        const numeroderegistro = dados.numeroderegistro;


    if (nome && sigla && numeroderegistro){
        const partido = new Partido(nome, sigla, numeroderegistro);
   
        //resolver a promessa de incluir um cliente (metódo incluir é assincrono)
        partido.incluir().then(() => {
            resposta.status(201).json({
                "status": true,
                "mensagem": "Partido incluído com sucesso!"
            })
        }).catch((erro)=>{
            resposta.status(500).json({
                "status": false,
                "mensagem": "Erro ao incluir o partido: " + erro.message
            })
        });
    }
    
    else{
        resposta.status(400).json({
            "status": false,
            "mensagem": "Requisição inválida! Informe todos os dados do candidato"
        })
    }

    }
    else{
        resposta.status(405).json({
            "status": false, 
            "mensagem": "Requisição inválida! Consulte a documentação da API"
        })
    }
};
alterar(requisicao, resposta){
    if (requisicao.method == "PUT" && requisicao.is("application/json")){
        const dados = requisicao.body;
        const nome = dados.nome;
        const sigla = dados.sigla;
        const numeroderegistro = dados.numeroderegistro;


        if (nome && sigla && numeroderegistro){
            const partido = new Partido(nome, sigla, numeroderegistro);
            partido.incluir().then(() => {
                resposta.status(201).json({
                    "status": true,
                    "mensagem": "Partido alterado com sucesso!"
                })
       
       
        }).catch((erro) => {
            resposta.status(500).json({
                "status": false,
                "mensagem": "Erro ao alterar o partido: " + erro.message
            })
        })
        
        }
        else{
            resposta.status(400).json({
                "status": false, 
                "mensagem": "Requisição inválida! Consulte a documentação da API"
            })
        }
    }
        else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API"

            });
        }

};
//irá processar requisições HTTP do tipo DELETE
excluir(requisicao, resposta){
    if (requisicao.method == "DELETE" && requisicao.is("application/json")){
    const { nome } = requisicao.body;
        if (nome){
            let partido = new Partido(nome);
            partido.excluir().then(()=>{
                resposta.status(200).json({
                  "status": true,
                  "mensagem": "Partido excluído com sucesso!"
                });
            }).catch((erro) => {
                resposta.status(500).json({
                  "status": false,
                  "mensagem": "Erro ao excluir o partido: " + erro.message
                })
            })
        }

        else{
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisão inválida! Informe o nome do partido!"
            });
        }

    }

    else{
        resposta.status(405).json({
            "status": false,
            "mensagem": "Requisição inválida! Consulte a documentação da API"

     });
        
    }

};

   
    //irá processar requisições HTTP do tipo GET
    consultar(requisicao, resposta){
        // o termo de busca será uma informação que será passada na url             
        //o objeto params da requisição acumula os parametros passados na url
        let termoBusca = requisicao.params.termoBusca;
        if (!termoBusca){
            termoBusca = "";
        }
        if (requisicao.method == "GET"){   
            const partido = new Partido();
            partido.consultar(termoBusca).then((partidos) => {
                return resposta.status(200).json({
                    "status": true,
                    "listaPartidos": partidos
                });

            }).catch((erro) => {
                return resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar os partidos: " + erro.message
                })
            })
        }
        else{
            return resposta.status(405).json({
                "status": false,
                "mensagem": "Requição inválida! Consulte a documentação da API"
            });
        }

    };
}