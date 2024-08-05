import { CurrencyComboBox } from '@/components/userComponents/transactionsComponents/CurrencyComboBox'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }
  return (
    <section className='container flex max-w-2xl flex-col items-center justify-between gap-4'>
      <div>
        
      <h1 className='text-center text-3xl'>Bienvenido, <span className='ml-2 font-bold'>{user.fullName}!👋</span></h1>
        <p className='tracking-wide'>Comencemos configurando tu moneda</p>
        <span className='tracking-wide'>Puedes cambiar esta configuración en cualquier momento.</span>
      </div>
      <Card className='w-full' >
        <CardHeader>
          <CardTitle>Moneda</CardTitle>
          <CardDescription>Establezca su moneda predeterminada</CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox />
</CardContent>
      </Card>
      <Separator />
      <Button className='w-full' asChild>
        <Link href='/dashboard' className='text-base'>¡He terminado!</Link>
      </Button>
    </section>
  )
}
