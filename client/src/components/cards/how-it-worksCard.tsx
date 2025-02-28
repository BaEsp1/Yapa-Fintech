import Button from "../ui/Button"
import { ArrowBackIos } from "@mui/icons-material"
import Link from "next/link"

export const HowItWorksHome = () =>{

    return(
        <div className="justify-center">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Cómo funciona</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                En solo unos pasos, comienza a construir tu futuro financiero con YAPA.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-accent300">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Registrate</h3>
                <p className="text-muted-foreground">Crea tu cuenta en minutos y completa tu perfil financiero.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-accent400">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Define tus objetivos</h3>
                <p className="text-muted-foreground">Establece tus metas financieras y el plazo para alcanzarlas.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-accent500">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Comienza a invertir</h3>
                <p className="text-muted-foreground">
                  Recibe tu portafolio personalizado y comienza a hacer crecer tu dinero.
                </p>
              </div>
            </div>
            <div className="mt-16 text-center">
              <Link href="/account/login">
                <Button size="large" variant="solid" className="shadow-lg">
                  Comenzar ahora
                  <ArrowBackIos className="ml-2 " />
                </Button>
              </Link>
            </div>
          </div>
    )
}