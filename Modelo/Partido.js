import PartidoDAO from "../DAO/PartidoDAO.js";
export default class Partido{
    #nome
    #sigla
    #numeroderegistro

    constructor(nome, sigla, numeroderegistro) {
        this.#nome = nome;                  
        this.#sigla = sigla;                  
        this.#numeroderegistro = numeroderegistro;                
    }
    
    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    get sigla(){
        return this.#sigla;
    }

    set sigla(novaSigla){
        this.#sigla = novaSigla;
    }

    get numeroderegistro(){
        return this.#numeroderegistro;
    }

    set numeroderegistro(novonumeroderegistro){
        this.#numeroderegistro = novonumeroderegistro;
    }


    toString(){
        return `Nome: ${this.#nome} \n
Sigla: ${this.#sigla} \n
Número de Registro: ${this.#numeroderegistro} \n
`
    }

    toJSON(){
        return{
            nome: this.#nome,                   
            sigla: this.#sigla,
            numeroderegistro: this.#numeroderegistro,       
        }
    }
    async incluir(){
        const partDAO = new PartidoDAO();
        await partDAO.incluir(this);
    }
    async alterar(){
        const partDAO = new PartidoDAO();
        await partDAO.alterar(this);
    }
    async excluir(){
        const partDAO = new PartidoDAO();
        await partDAO.excluir(this);
    }

    async consultar(termoBusca){
        const partDAO = new PartidoDAO();
        return await partDAO.consultar(termoBusca); 
    }
}
