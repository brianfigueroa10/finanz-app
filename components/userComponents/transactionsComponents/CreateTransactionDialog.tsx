'use client'
import { TransactionType } from '@/lib/types';
import React, { ReactNode, useCallback, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { CreateTransactionSchema, CreateTransactionSchemaType } from '@/schema/transaction';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../../ui/form';
import { Input } from '../../ui/input';
import SelectCategory from '../categoryComponents/SelectCategory';
import { Popover, PopoverTrigger } from '../../ui/popover';
import { Button } from '../../ui/button';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { PopoverContent } from '@radix-ui/react-popover';
import { Calendar } from '../../ui/calendar';
import { Card } from '../../ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTransaction } from '@/app/(dashboard)/dashboard/_actions/transactions';
import { toast } from 'sonner';
import { DateToUTCDate } from '@/lib/helpers';

import { useRouter } from 'next/navigation';
import { revalidatePath, revalidateTag } from 'next/cache';


interface Props {
  trigger: ReactNode;
  type: TransactionType

}

export default function CreateTransactionDialog({ trigger, type }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<CreateTransactionSchemaType>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      type,
      date: new Date(),
    }
  })



  const handleCategoryChange = useCallback((category: string) => {
    form.setValue('category', category)
  }, [form])

  const { mutate, isPending } = useMutation({
    mutationFn: CreateTransaction,
    onSuccess: async () => {
      toast.success(`Transaccion creada 🎉`, {
        id: "create-transaction",
      })
      form.reset({
        description: '',
        amount: 0,
        category: undefined,
        date: new Date(),
        type
      })
      await queryClient.invalidateQueries({
        queryKey: ["overview"],
      });
      setOpen((prev) => !prev);

      
    }

  })

  const onSubmit = useCallback(
    (values: CreateTransactionSchemaType) => {
      toast.loading("Creando transaccion...", { id: "create-transaction" });

      mutate({
        ...values,
        date: DateToUTCDate(values.date),
      })
  
    },
    
    [mutate]
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear un nuevo {" "}
            <span className={cn(" font-bold text-lg capitalize", type === 'income' ? 'text-emerald-500' : 'text-rose-500')}
            >
              {type === "income" ? "Ingreso" : "Gasto"}.
            </span>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input defaultValue="" {...field} />
                  </FormControl>
                  <FormDescription>
                    Agrega una breve descripción (Opcional)
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto</FormLabel>
                  <FormControl>
                    <Input defaultValue={0} type='number' {...field} />
                  </FormControl>
                  <FormDescription>
                    Agrega el monto (Requerido)
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className='flex items-center justify-between gap-2'>

            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='mr-2'>Categoria</FormLabel>
                  <FormControl>
              <SelectCategory type={type} onChange={handleCategoryChange} />
                  </FormControl>
                  <FormDescription>
                    Elegi una Categoria
                  </FormDescription>
                </FormItem>
              )}
              />
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='mr-2'>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={'outline'} className={cn('w-[200px] text-left font-normal justify-between items-center', !field.value && '')}>
                            {field.value ? 
                              (format(field.value, 'PPP')) : (<span>Elegi Fecha</span>)}
                            <CalendarIcon className='ml-2 h-4 w-4' />

                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Card>

                          <Calendar mode='single' selected={field.value} onSelect={(value) => {
                            if (!value) return;
                            field.onChange(value);
                        }} initialFocus />
                        </Card>
                              </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Elegi una fecha
                    </FormDescription>
                  </FormItem>
                )}
              />
              </div>
          </form>

        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"} onClick={() => { form.reset() }}>Cancelar</Button>
          </DialogClose>
          <Button variant={"default"} onClick={form.handleSubmit(onSubmit)
      
          } disabled={isPending}> {isPending ? `Creando... ${<Loader2 className='w-4 h-4 animate-spin' />}` : 'Crear'}</Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  )
}
