"use client"
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ArrowBackIos} from "@mui/icons-material";
import { NavHome } from "@/components/navs/NavHome";
import Screen from "@/assets/images/Screen.png"
import { FeatureHome } from "@/components/cards/featuringCard";
import { HowItWorksHome } from "@/components/cards/how-it-worksCard";
import { TestimonialsHome } from "@/components/cards/TestimonialCard";
import { FAQHome } from "@/components/cards/FAQCard";
import { FooterHome } from "@/components/layout/FooterLP";
import Link from "next/link";


export default function Home() {

  return (
    <div className="flex min-h-screen flex-col w-full">
      <NavHome/>
      <main className="flex-1 w-full">
        <section className="py-10 md:py-14 lg:py-5 flex flex-row">
          <div className="flex flex-col items-center text-center w-full justify-center w-[50%]">
            <h1 className="text-h3-bold md:text-5xl lg:text-6xl tracking-tight max-w-3xl">
              Tu futuro financiero comienza con <span className="text-accent400">YAPA</span>
            </h1>
            <p className="mt-6 text-p1-regular md:text-xl text-muted-foreground max-w-2xl mx-2">
              Empodera tu economía con inversiones personalizadas. Define tus objetivos, nosotros te ayudamos a
              alcanzarlos.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="medium" variant="solid" className="px-8 shadow-lg">
                  Comenzar ahora
                  <ArrowBackIos className="ml-2" />
                </Button>
              </Link>
              <Link href="/#features">
                <Button size="medium" variant="outline" className="shadow-lg">
                  Conocer más
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex bg-gradient-to-l from-blue-600 to-slate-0 justify-center items-center w-[50%]">
          <Image src={Screen} alt="" className="h-[90%] m-auto"/>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/50">
          <FeatureHome/>
        </section>

        <section id="how-it-works" className="py-20">
          <HowItWorksHome/>
        </section>

        <section id="testimonials" className="py-20 bg-muted/50">
          <TestimonialsHome/>
        </section>

        <section id="faq" className="py-20">
          <FAQHome/>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="justify-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Comienza tu camino hacia la libertad financiera</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Únete a miles de argentinos que ya están construyendo su futuro con YAPA.
            </p>
            <Link href="/login">
              <Button size="large" variant="solid" className="px-8">
                Registrarse gratis
                <ArrowBackIos className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <FooterHome/>
    </div>
  )
}


