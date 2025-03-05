import Image from "next/image"
import Button from "../ui/Button"
import logo from "@/assets/logo/LogoLargo.png"
import Link from "next/link"

export const NavHome = () =>{

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xl text-primary">
                  <Image src={logo} alt="logo" className="h-16 w-[10em]"/>
                  </div>
                  <nav className="hidden md:flex gap-6">
                    <Link href="#features" className="text-sm font-medium hover:text-primary">
                      Características
                    </Link>
                    <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
                      Cómo funciona
                    </Link>
                    <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
                      Testimonios
                    </Link>
                    <Link href="#faq" className="text-sm font-medium hover:text-primary">
                      FAQ
                    </Link>
                  </nav>
         
                  <Link href="/login" className="flex items-center gap-4">
                    <Button size="medium" variant="solid">Ingresar</Button>
                  </Link>
      
                </div>
              </header>
    )
}