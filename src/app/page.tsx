"use client";

import { getMarcas } from "@/redux/features/slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "@/redux/store";
import { Form } from "../components/Form";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMarcas());
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full justify-center items-center h-screen bg-slate-200">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-3xl font-bold text-black/70">Tabela Fipe</h1>
        <h3 className="text-xl font-bold text-black/70">
          Consulte o valor de um veículo de forma gratuita
        </h3>
      </div>
      <Form />
    </div>
  );
}
