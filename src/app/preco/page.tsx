"use client"

import { precoSelector } from '@/redux/features/slice'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

function PrecoView() {

  const data = useSelector(precoSelector)

  if(data){
    return (
      <div className="bg-green-100 w-full flex flex-col gap-3 justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Tabela Fipe: Preço {data.Modelo} {data.AnoModelo}</h1>
        <div className='rounded-full bg-green-600 p-4'>
          <span className='text-2xl font-semibold text-white'>
          {data.Valor}
            </span>
        </div>
        <p className='text-slate-400'>Este é o preço de compra do veículo</p>
      <Link href="/" className="underline font-semibold">Voltar</Link>
      </div>
    )
  }
}

export default PrecoView