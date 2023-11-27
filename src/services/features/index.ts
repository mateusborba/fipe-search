import { api } from "../api";

function fetchMarcas() {
    return api.get("/marcas")
}

function fetchModelos(marcas: string){
    return api.get(`/marcas/${marcas}/modelos`)
}

function fetchAnos(marcas: string, modelo: string) {
    return api.get(`/marcas/${marcas}/modelos/${modelo}/anos`)
}

function fetchPreco(marca: string, modelo: string, ano: string) {
    return api.get(`/marcas/${marca}/modelos/${modelo}/anos/${ano}`)
}

export {fetchMarcas, fetchModelos, fetchAnos, fetchPreco}