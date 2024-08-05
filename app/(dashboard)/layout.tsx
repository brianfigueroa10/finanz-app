'use client'

import "./../globals.css"
import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import NavbarUser from "@/components/userComponents/NavbarUser"

export default function Layout({
  children,
}: {
  children: React.ReactNode
  }) {
  const [queryClient] = React.useState(() => new QueryClient({}))
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col container min-h-screen" >
        <header className="flex-auto">
        <NavbarUser />
        </header>
        <main className="flex flex-col flex-1 " >
      {children}
      </main>
        <footer className="border-t w-screen flex  items-center justify-center flex-auto h-24 max-h-24">
          <p className="font-bold">Copyright © 2024</p>
        </footer>
      </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  )
}
