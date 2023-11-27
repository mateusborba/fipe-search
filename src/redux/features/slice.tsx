import { fetchAnos, fetchMarcas, fetchModelos, fetchPreco } from "@/services/features";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    marcas: { data: [], isLoading: false },
    modelos:  { data: [], isLoading: false },
    anos:  { data: [], isLoading: false },
    preco: { data: null, isLoading: false },
  },
  reducers: {
    resetData(state) {
        state.marcas = { data: [], isLoading: false };
        state.modelos = { data: [], isLoading: false };
        state.anos = { data: [], isLoading: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMarcas.fulfilled, (state, { payload }) => {
      state.marcas.data = payload;
      state.marcas.isLoading = false;
    });
    builder.addCase(getMarcas.pending, (state) => {
      state.marcas.isLoading = true;
    });
    builder.addCase(getModelos.fulfilled, (state, { payload }) => {
      state.modelos.data = payload.modelos
      state.modelos.isLoading = false;
    })
    builder.addCase(getModelos.pending, (state) => {
      state.modelos.isLoading = true;
    });
    builder.addCase(getAnos.fulfilled, (state, { payload }) => {
      state.anos.data = payload
      state.anos.isLoading = false;
    })
    builder.addCase(getAnos.pending, (state) => {
      state.anos.isLoading = true;
    });
    builder.addCase(getPreco.fulfilled, (state, {payload}) => {
      state.preco.data = payload
      state.preco.isLoading = false;
    })
    builder.addCase(getPreco.pending, (state) => {
      state.preco.isLoading = true;
    });
  },
  });


export const { resetData } = mySlice.actions;

export const marcasSelector = (state: {
  mySlice: { marcas: { data: { codigo: string; nome: string } } };
}) => {
  return state.mySlice.marcas.data;
};

export const marcarsLoader =(state: {
  mySlice: { marcas: { data: { codigo: string; nome: string }, isLoading: boolean } };
}) => {
  return state.mySlice.marcas.isLoading
}

export const modelosSelector = (state: {
  mySlice: { modelos: { data: { codigo: string; nome: string }, isLoading: boolean } };
}) => {
  return state.mySlice.modelos.data;
};

export const modelosLoader = (state: {
  mySlice: {modelos: {data: {codigo: string; nome: string}, isLoading: boolean}}
}) => {
  return state.mySlice.modelos.isLoading
}

export const anosSelector = (state: {
  mySlice: { anos:{ data: { codigo: string; nome: string }, isLoading: boolean} }
}) => {
  return state.mySlice.anos.data;
};

export const anosLoader = (state: {
  mySlice: { anos:{ data: { codigo: string; nome: string }, isLoading: boolean} };
}) => {
  return state.mySlice.anos.isLoading;
};

export const precoSelector = (state: {
  mySlice: {
    preco: {data: { TipoVeiculo: number
      Valor: string
      Marca: string
      Modelo: string
      AnoModelo: number
      Combustivel: string
      CodigoFipe:string
      MesReferencia: string
      SiglaCombustivel: string }, isLoading: boolean}};
}) => {
  return state.mySlice.preco.data;
};

export const precoLoader = (state: {
  mySlice: {
    preco: {data: { TipoVeiculo: number
      Valor: string
      Marca: string
      Modelo: string
      AnoModelo: number
      Combustivel: string
      CodigoFipe:string
      MesReferencia: string
      SiglaCombustivel: string }, isLoading: boolean}};
}) => {
  return state.mySlice.preco.isLoading
  }

export default mySlice.reducer;
