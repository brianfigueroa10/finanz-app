'use client'
import { UserSettings } from '@prisma/client'
import { differenceInDays, startOfMonth } from 'date-fns'
import React, { useState } from 'react'
import { DateRangePicker } from '../../ui/date-range-pick'
import { toast } from 'sonner'
import { MAX_DATE_RANGE_DAYS } from '@/schema/overviews'
import StatsCards from './StatsCards'
import CategoriesStats from '../categoryComponents/CategoriesStats'

interface Props {
  userSettings: UserSettings
}

export default function Overview({ userSettings }: Props) {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date()
  })
  return (
    <div>
      <div className="container flex flex-wrap items-end justify-between gap-2 py-6">
        <h2 className="text-3xl font-bold">Descripción general</h2>
        <div className="flex items-center gap-3">
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
      <div className="container flex w-full flex-col gap-2">
        <StatsCards
          userSettings={userSettings}
          from={dateRange.from}
          to={dateRange.to}
        />

        <CategoriesStats
          userSettings={userSettings}
          from={dateRange.from}
          to={dateRange.to}
        />
      </div>
    </div>
  )
}
