"use client";

import { DateRangePicker } from "@/components/ui/date-range-pick";
import TransactionTable from "@/components/userComponents/TransactionTable";
import { MAX_DATE_RANGE_DAYS } from "@/schema/overviews";
import { differenceInDays, startOfMonth } from "date-fns";
import React, { useState } from "react";
import { toast } from "sonner";

function TransactionsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <section className="mt-8">
      <div className="bg-card">
        <div className=' container flex justify-between items-center'>
          <div className='flex flex-wrap flex-col py-8'>
            <p className='text-3xl font-bold'>Historial de Transacciones</p>
            <p>Todas tus actividades recientes</p>

          </div>
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(values) => {
              const { from, to } = values.range;

              if (!from || !to) return;
              if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                toast.error(
                  `El intervalo de fechas seleccionado es demasiado grande. El rango máximo permitido es ${MAX_DATE_RANGE_DAYS} dias!`
                );
                return;
              }

              setDateRange({ from, to });
            }}
          />
        
        </div>
      </div>
      <div className="container">
        <TransactionTable from={dateRange.from} to={dateRange.to} />
      </div>
    </section>
  );
}

export default TransactionsPage;

