'use client'
import { TransactionType } from '@/lib/types'
import { CreateCategorySchema, CreateCategorySchemaType } from '@/schema/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { ReactNode, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { CircleOff, Loader2, PlusSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '../../ui/form';
import { Input } from '../../ui/input';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCategory } from '@/app/(dashboard)/dashboard/_actions/categories';
import { Category } from '@prisma/client';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { useTheme } from 'next-themes';

interface Props {
  type: TransactionType;
  successCallback: (category: Category) => void;
  trigger?: ReactNode;
}

export default function CreateCategoryDialog({ type , successCallback, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type
    }
  })

  const queryClient = useQueryClient()
  const theme = useTheme();

  const { mutate, isPending } = useMutation({
    mutationFn: CreateCategory,
    onSuccess: async (data: Category) => {
      form.reset({
        name: "",
        icon: "",
        type,
      });

      toast.success(`Categoria ${data.name} creada🎉`, {
        id: "create-category",
      });

      successCallback(data);


      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error("Algo salió mal", {
        id: "create-category",
      });
    },
  });
  const onSubmit = useCallback(
    (values: CreateCategorySchemaType) => {
      toast.loading("Creando categoría...", {
        id: "create-category",
      });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {
          trigger ? (trigger) : (
          <Button variant={"ghost"} className='flex border-separate items-start justify-start rounded-none border-b px-3 py-3 ' aria-expanded={open} role='combobox' >
          <PlusSquare className='mr-2 h-4 w-4' />
          Crear Nueva</Button>)}
      </DialogTrigger>
      <DialogContent>

      <DialogHeader className='justify-center'>
        <DialogTitle>Crear una nueva categoria de <span className={cn("ml-1 text-xl", type === 'income' ? 'text-emerald-500' : 'text-rose-500')}>{type === 'income' ? 'Ingresos' : 'Gastos'}</span></DialogTitle>
        <DialogDescription>
          Crear una nueva categoria.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>

        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder='Category' {...field} />
                </FormControl>
                <FormDescription>
                  Así aparecerá tu categoría en la aplicación
                </FormDescription>
              </FormItem>
            )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icono</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="h-[100px] w-full"
                        >
                          {form.watch("icon") ? (
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-5xl" role="img">
                                {field.value}
                              </span>
                              <p className="text-xs">
                                Haga clic para cambiar
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <CircleOff className="h-[48px] w-[48px]" />
                              <p className="text-xs ">
                                Click para seleccionar
                              </p>
                            </div>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full">
                        <Picker
                          data={data}
                          theme={theme.resolvedTheme}
                          onEmojiSelect={(emoji: { native: string }) => {
                            field.onChange(emoji.native);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    Así aparecerá tu categoría en la aplicación
                  </FormDescription>
                </FormItem>
              )}
            />

        </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"} onClick={() => { form.reset() }}>Cancelar</Button>
          </DialogClose>
          <Button variant={"default"} onClick={form.handleSubmit(onSubmit)} disabled={isPending}> {isPending ? `Creando.. ${<Loader2 className='w-4 h-4 animate-spin' />}` : 'Crear'}</Button>
        </DialogFooter>
            </DialogContent>
    </Dialog>
  )
}
