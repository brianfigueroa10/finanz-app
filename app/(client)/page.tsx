import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className=" w-full h-full ">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12  max-lg:items-center max-lg:justify-center">
        <div className="mr-auto place-self-center lg:col-span-7 flex flex-col items-center justify-center h-full">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">FinanzApp: Tu Guía Personalizada para el Éxito Financiero</h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Descubre FinanzApp, tu aliado para un manejo inteligente del dinero. Convierte tus sueños financieros en realidad al gestionar tus ingresos y gastos de manera eficiente. Con opciones de personalización de moneda y categorización de gastos, FinanzApp te ofrece el control total de tu situación financiera. Empieza a construir tu futuro económico con confianza y seguridad hoy mismo.</p>

          <div className="flex flex-wrap gap-2 items-start w-full">
            <Button asChild variant={"secondary"}>
              <Link href="/sign-in">
                Inicia Sesion<svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </Link>
             
            </Button>
            <Button asChild variant={"link"}>
              <Link href="/sign-uo">
                Registrate<svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </Link>

            </Button>
          </div>
        
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/search-mockup-dark.png" alt="mockup" width={500} height={500} />
        </div>
      </div>
    </section>
  )
}
