"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ui/swithTheme";
import { LogIn,  Wallet } from "lucide-react";
;

export default function NavbarHome() {
  return (
    <div>
      <DesktopNavbar />
      <MobileNavbar />
    </div>
  );
}



function MobileNavbar() {
  return (
    <div className="block md:hidden border-separate border-b bg-background fixed top-0 w-full left-0 ">
      <nav className="container flex items-center justify-between px-8">
        <Link href="/" className="text-lg font-black antialiased flex items-center gap-2" ><Wallet className="w-5 h-5" /> FinanzApp</Link>
        <div className="flex min-h-[60px] items-center justify-center gap-x-4">
  
          <div className="flex h-full gap-2 items-center">
            <ModeToggle />

            <SignedOut>
              <SignInButton>
                <LogIn className="w-6 h-6 cursor-pointer" />
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" >Dashboard</Link>
              <UserButton />
      
            </SignedIn>

          </div>
        </div>
      </nav>
    </div>
  );
}

function DesktopNavbar() {
  return (
    <div className="hidden md:block border-separate border-b bg-background fixed top-0 w-full left-0 ">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex w-full h-[80px] min-h-[60px] items-center gap-x-4 justify-between">
          <Link href="/" className="text-lg font-black antialiased flex items-center gap-2" ><Wallet className="w-5 h-5" /> FinanzApp</Link>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <SignedOut>
            <SignInButton>
              <LogIn className="w-6 h-6 cursor-pointer" />
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" >Dashboard</Link>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}
