//micro aplicação HTTP oferecida pelo express
import { Router } from "express";
import PartidoCtrl from "../Controle/PartidoCtrl.js";

const rotaPartido = Router();
const ctrlPartido = new PartidoCtrl();

rotaPartido.get("/", ctrlPartido.consultar)
.get("/:termoBusca", ctrlPartido.consultar)
.post("/", ctrlPartido.incluir)
.put("/", ctrlPartido.alterar)
.delete("/", ctrlPartido.excluir);

export default rotaPartido;