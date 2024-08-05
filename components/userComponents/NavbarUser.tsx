"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../ui/swithTheme";
import { Menu, Wallet } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export default function NavbarUser() {
  return (
    <header className="mb-8">
      <DesktopNavbar />
      <MobileNavbar />
    </header>
  );
}

const items = [
  { label: "Dashboard", link: "/dashboard" },
  { label: "Configuracion", link: "/manage" },
];

function MobileNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="block md:hidden border-separate border-b bg-background fixed top-0 w-full left-0 z-20 ">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent className="w-[400px] sm:w-[540px]" side="left">
            <Link href="/" className="text-lg font-black antialiased flex items-center gap-2" ><Wallet className="w-5 h-5" /> FinanzApp</Link>
          
            <div className="flex flex-col gap-1 pt-4">
              {items.map((item) => (
                <NavbarItem
                  key={item.label}
                  label={item.label}
                  link={item.link}
                  clickCallback={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex min-h-[60px] items-center justify-center gap-x-4">
          <Link href="/" className="text-lg font-black antialiased flex items-center gap-2" ><Wallet className="w-5 h-5" /> FinanzApp</Link>
          <div className="flex h-full gap-2 items-center">
            <ModeToggle />

            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </nav>
    </div>
  );
}

function DesktopNavbar() {
  return (
    <div className="hidden md:block  border-b bg-background fixed top-0 w-full left-0 z-20 ">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex w-full h-[60px] min-h-[60px] items-center gap-x-4 justify-between">
          <Link href="/" className="text-lg font-black antialiased flex items-center gap-2" ><Wallet className="w-5 h-5" /> FinanzApp</Link>
          <div className="flex h-full">
            {items.map((item) => (
              <NavbarItem
                key={item.label}
                label={item.label}
                link={item.link}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />

          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
}

function NavbarItem({
  label,
  link,
  clickCallback,
}: {
  label: string;
  link: string;
  clickCallback?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex items-center gap-4">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "w-full justify-start text-base  hover:text-foreground",
          isActive && "font-semibold underline"
        )}
        onClick={() => {
          if (clickCallback) clickCallback();
          {
          }
        }}>
        {label}
      </Link>
      {isActive && (
        <div className="md:block"></div>
      )}
    </div>
  );
}
