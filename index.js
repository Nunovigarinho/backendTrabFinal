import express from "express";
import rotaPartido from "./Rotas/rotaPartido.js";
import cors from "cors";


const app = express();
const host = "0.0.0.0"; //todas as interfaces de rede
const porta= 4000;

app.use(cors({
  origin:"*",
}));
app.use(express.json()); 

app.use('/partidos', rotaPartido);

app.listen(porta, host, ()=>{
  console.log(`Servidor iniciado em http://${host}:${porta}`);
})