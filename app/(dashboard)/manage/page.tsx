"use client";
import { CurrencyComboBox } from '@/components/userComponents/transactionsComponents/CurrencyComboBox'
import SkeletonWrapper from '@/components/SkeletonWrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import CreateCategoryDialog from '@/components/userComponents/categoryComponents/CreateCategoryDialog'
import { TransactionType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Category } from '@prisma/client'



import { PlusSquare, TrashIcon, TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'
import DeleteCategoryDialog from '@/components/userComponents/categoryComponents/DeleteCategoryDialog'
import { useQuery } from '@tanstack/react-query'


export default async function page() {

  return (
    <section className='mt-8'>
      <div className=' container '>
        <div className='flex flex-wrap flex-col py-8'>
          <p className='text-3xl font-bold underline'>Configuración</p>
          <p>Administra la configuración y las categorías de tu cuenta</p>
        </div>

      </div>
      <div className='container flex flex-col w-full gap-4 py-4'>
        <Card>
          <CardHeader>
            <CardTitle>Moneda</CardTitle>
            <CardDescription>
              Elegí tu moneda predeterminada:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencyComboBox />
          </CardContent>
        </Card>
        <CategoryList type={'income'} />
        <CategoryList type={'expense'} />

      </div>
    </section>
  )
}

function CategoryList({ type }: { type: TransactionType }) {
  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const dataAvailable = categoriesQuery.data && categoriesQuery.data.length > 0;

  return (
    <SkeletonWrapper isLoading={categoriesQuery.isLoading}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {type === "expense" ? (
                <TrendingDown className="h-12 w-12 items-center rounded-lg bg-red-400/10 p-2 text-red-500" />
              ) : (
                <TrendingUp className="h-12 w-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500" />
              )}
              <div>
                Categoria {type === "income" ? "Ingresos" : "Gastos"}
                <div className="text-sm">
                  Ordenado por Nombre
                </div>
              </div>
            </div>

            <CreateCategoryDialog
              type={type}
              successCallback={() => categoriesQuery.refetch()}
              trigger={
                <Button className="gap-2 text-sm">
                  <PlusSquare className="h-4 w-4" />
                  Crear una Categoria
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
        {!dataAvailable && (
          <div className="flex h-40 w-full flex-col items-center justify-center">
            <p>
              Aún no hay categorías de
              <span
                className={cn(
                  "m-1",
                  type === "income" ? "text-emerald-500" : "text-red-500"
                )}
              >
                {type === "income" ? "Ingresos" : "Gastos"}
              </span>
            </p>

            <p className="text-sm">
              Crea una categoria para comenzar
            </p>
          </div>
        )}
        {dataAvailable && (
          <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoriesQuery.data.map((category: Category) => (
              <CategoryCard category={category} key={category.name} />
            ))}
          </div>
        )}
      </Card>
    </SkeletonWrapper>
  );
}


function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="flex border-separate flex-col justify-between rounded-md border shadow-md shadow-black/[0.1] dark:shadow-white/[0.1]">
      <div className="flex flex-col items-center gap-2 p-4">
        <span className="text-3xl" role="img">
          {category.icon}
        </span>
        <span>{category.name}</span>
      </div>
      <DeleteCategoryDialog
        category={category}
        trigger={
          <Button
            className="flex w-full border-separate items-center gap-2 rounded-t-none  hover:bg-red-500/20"
            variant={"secondary"}
          >
            <TrashIcon className="h-4 w-4" />
            Eliminar
          </Button>
        }
      />
    </div>
  );
}