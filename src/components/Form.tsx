"use client";

import { Button } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import {
  anosSelector,
  getAnos,
  getModelos,
  getPreco,
  marcasSelector,
  modelosSelector,
} from "@/redux/features/slice";
import { Controller, useForm } from "react-hook-form";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { GenericSelect } from "@/components/GenericSelect";
import { useRouter } from 'next/navigation';

function Form() {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();


  const { control, handleSubmit, watch, resetField } = useForm({
    defaultValues: { marca: "", modelo: "", ano: "" },
  });

  const ano = watch("ano");
  const marca = watch("marca");
  const modelo = watch("modelo");

  const marcasStore = useSelector(marcasSelector);
  const opcoesDeMarca = Array.isArray(marcasStore)
    ? marcasStore
    : [marcasStore];

  const modelosStore = useSelector(modelosSelector);
  const opcoesDeModelos = Array.isArray(modelosStore)
    ? modelosStore
    : [modelosStore];

  const anosStore = useSelector(anosSelector);
  const opcoesDeAno = Array.isArray(anosStore) ? anosStore : [anosStore];

  useEffect(() => {
    if (marca) {
      dispatch(getModelos(marca));
    }
    resetField("modelo");
    resetField("ano");
  }, [dispatch, marca, resetField]);

  useEffect(() => {
    if (modelo) {
      dispatch(getAnos({ marca: marca, modelo: modelo }));
    }
    resetField("ano");
  }, [modelo, marca, dispatch, resetField]);

  async function formSubmit(data: {
    marca: string;
    modelo: string;
    ano: string;
  }) {
    const { marca, modelo, ano } = data;

    await dispatch(getPreco({ marca, modelo, ano }));

    router.push("/preco")

  }

  return (
    <div className="flex flex-col gap-6 items-center bg-white shadow-md w-auto py-10 px-20 rounded-lg my-4">
      <form
        onSubmit={handleSubmit((data) => formSubmit(data))}
        className="flex flex-col gap-5 items-center w-full"
      >
        <Controller
          name="marca"
          control={control}
          render={({ field }) => (
            <GenericSelect
              {...field}
              value={field.value}
              id="select-1"
              onChange={(value) => field.onChange(value)}
              label="Marca"
              options={opcoesDeMarca}
            />
          )}
        />
        <Controller
          name="modelo"
          control={control}
          render={({ field }) => (
            <GenericSelect
              {...field}
              value={field.value}
              id="select-1"
              onChange={(value) => field.onChange(value)}
              label="Modelo"
              options={opcoesDeMarca ? opcoesDeModelos : []}
            />
          )}
        />
        {modelo && (
          <Controller
            name="ano"
            control={control}
            render={({ field }) => (
              <GenericSelect
                {...field}
                value={field.value}
                id="select-1"
                onChange={(value) => field.onChange(value)}
                label="Ano"
                options={opcoesDeModelos ? opcoesDeAno : []}
              />
            )}
          />
        )}
        <Button
          type="submit"
          className={`${
            ano ? "bg-[#3c0080]" : "bg-[#dad8d8]"
          } px-8 py-2 font-semibold capitalize w-48`}
          disabled={!ano}
        >
          <span className={`${ano ? "text-white" : ""}`}>Consultar preço</span>
        </Button>
      </form>
    </div>
  );
}

export { Form };
