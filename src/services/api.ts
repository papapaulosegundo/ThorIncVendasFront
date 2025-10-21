import axios from "axios";

const api = axios.create({ baseURL: "/api" });
export default api;

export type ContatoDTO = {
  nome: string;
  email: string;
  nomeEmpresa: string;
  segmentoEmpresa: string;
};