"use client";
import { TransactionType } from "@/lib/types";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import CreateCategoryDialog from "./CreateCategoryDialog";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  type: TransactionType;
  onChange: (category: string) => void;
 
}

export default function SelectCategory({ type , onChange}: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    if (!value) return;
    onChange(value);
  }, [onChange, value]);

  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () =>
      fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const selectedCategory = categoriesQuery.data?.find(
    (category: Category) => category.name === value
  );
  const successCallback = useCallback((category: Category) => {
    setValue(category.name);
    setOpen((prev) => !prev);
  }, [setValue, setOpen]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="w-[200px] px-2 justify-between"
          aria-expanded={open}
          role="combobox">
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            <span>Elegi una Categoria</span>
          )}
          <ChevronsUpDown  className="ml-2 h-4 w-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[200px]">
        <Command 
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <CommandInput placeholder="Buscar..." />
          <CreateCategoryDialog type={type} successCallback={successCallback} />
          <CommandEmpty className="px-3 py-1 flex flex-col items-start">
            <p className="text-lg">No hay categorias</p>
            <span className="text-xs ">Crea una nueva category</span>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categoriesQuery.data &&
                categoriesQuery.data.map((category: Category) => (
                  <CommandItem
                    key={category.name}
                    onSelect={() => {
                      setValue(category.name);
                      setOpen((prev) => !prev);
                    }}>
                    <CategoryRow category={category} />
                    <Check
                      className={cn(
                        "ml-2 h-4 w-4 opacity-0",
                        value === category.name && "opacity-100"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function CategoryRow({ category }: { category: Category }) {
  return (
    <div className="flex items-start gap-1">
      <span role="img">{category.icon}</span>
      <span>{category.name}</span>
    </div>
  );
}
