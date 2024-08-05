import { Button } from '@/components/ui/button'
import CreateTransactionDialog from '@/components/userComponents/transactionsComponents/CreateTransactionDialog'
import Overview from '@/components/userComponents/transactionsComponents/Overview'
import prisma from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import TransactionsPage from '../../../components/userComponents/transactionsComponents/TransactionPage'


export default async function page() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id
    }
  })

  if (!userSettings) {
    redirect('/wizard')
  }

  return (
    <section className='w-full mt-8 '>
      <div className='border-b'>
        <div className='container flex flex-wrap items-center justify-between gap-6 py-8'>
          <p className='text-3xl font-bold'>Hola, {user.fullName} 👋</p>
          <div className='flex items-center gap-3'>
            <CreateTransactionDialog trigger={<Button variant={"outline"} className='border-emerald-500 bg-emerald-900 text-white hover:bg-emerald-700 hover:text-white'>Nuevo Ingreso</Button>} type='income' />

              <CreateTransactionDialog trigger={<Button variant={"outline"} className='border-rose-500 bg-rose-900 text-white hover:bg-rose-700 hover:text-white'>Nuevo Gasto</Button>} type='expense' />

          </div>
        </div>

      </div>
      <Overview userSettings={userSettings} />
      <TransactionsPage />
 

    </section>
  )
}
