import { fetchAnos, fetchMarcas, fetchModelos, fetchPreco } from "@/services/features";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AnoModelo {
  marca: string;
  modelo: string;
  ano?: string;
}

export const getMarcas = createAsyncThunk("getMarcas", async () => {
  try {
    const response = await fetchMarcas();
    return response.data;
  } catch (error) {
    return error;
  }
});

export const getModelos = createAsyncThunk(
  "getModelo",
  async (modelo: string) => {
    try {
      const response = await fetchModelos(modelo);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);


export const getAnos = createAsyncThunk(
  "getAno",
  async ({marca, modelo}: AnoModelo) => {
    try {
      const response = await fetchAnos(marca, modelo);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getPreco = createAsyncThunk(
  "getPreco",
  async ({marca, modelo, ano}: AnoModelo) => {
    try {
      if (ano !== undefined) {
        const response = await fetchPreco(marca, modelo, ano);
        return response.data;
      } else {
        throw new Error('Ano não fornecido');
      }
    } catch (error) {
      return error;
    }
  }
);

export const mySlice = createSlice({
  name: "mySlice",
  initialState: {
    marcas: [],
    modelos: [],
    anos: [],
    preco: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMarcas.fulfilled, (state, { payload }) => {
      state.marcas = payload;
    });
    builder.addCase(getModelos.fulfilled, (state, { payload }) => {
      state.modelos = payload.modelos
    })
    builder.addCase(getAnos.fulfilled, (state, { payload }) => {
      state.anos = payload
    })
    builder.addCase(getPreco.fulfilled, (state, {payload}) => {
      state.preco = payload
    })
  },
});

export const marcasSelector = (state: {
  mySlice: { marcas: { codigo: string; nome: string } };
}) => {
  return state.mySlice.marcas;
};

export const modelosSelector = (state: {
  mySlice: { modelos: { codigo: string; nome: string } };
}) => {
  return state.mySlice.modelos;
};
export const anosSelector = (state: {
  mySlice: { anos: { codigo: string; nome: string } };
}) => {
  return state.mySlice.anos;
};

export const precoSelector = (state: {
  mySlice: {
    preco: { TipoVeiculo: number
    Valor: string
    Marca: string
    Modelo: string
    AnoModelo: number
    Combustivel: string
    CodigoFipe:string
    MesReferencia: string
    SiglaCombustivel: string }};
}) => {
  return state.mySlice.preco;
};

export default mySlice.reducer;
