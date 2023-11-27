"use client"

import { precoLoader, precoSelector } from '@/redux/features/slice'
import Link from 'next/link'
import { useSelector } from 'react-redux'

function PrecoView() {

  const data = useSelector(precoSelector)

  const loader = useSelector(precoLoader)

  return (
    <div className="bg-green-100 w-full flex flex-col gap-3 justify-center items-center h-screen">
      {!loader && data &&
        <>
        <h1 className="text-2xl font-bold">Tabela Fipe: Preço {data.Modelo} {data.AnoModelo}</h1>
         <div className='rounded-full bg-green-600 p-4'>
           <span className='text-2xl font-semibold text-white'>
           {data.Valor}
             </span>
         </div>
         <p className='text-slate-400'>Este é o preço de compra do veículo</p>
       <Link href="/" className="underline font-semibold">Voltar</Link>
        </>
      }
      {!loader && !data &&
        <>
        <h1 className="text-2xl font-bold">Não foi possível realizar a consulta. Tente novamente</h1>
       <Link href="/" className="underline font-semibold">Voltar</Link>
        </>
      }
    </div>
    )

}

export default PrecoView