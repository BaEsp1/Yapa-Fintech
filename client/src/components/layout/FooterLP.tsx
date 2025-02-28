import Link from "next/link"
import Image from "next/image"
import logo from "@/assets/logo/LogoLargo.png";

export const FooterHome = () =>{

    return(
        <footer className="border-t py-12 bg-muted/30">
        <div className="justify-center p-2">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center gap-2 font-bold text-xl text-primary mb-4">
            <Image src={logo} alt="" className="w-[12em] h-20"/>
              </div>
              <p className="text-muted-foreground p-2">
                Empoderando a los argentinos para alcanzar sus metas financieras a través de inversiones inteligentes y
                personalizadas.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Producto</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Características
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Cómo funciona
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Precios
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Compañía</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Sobre nosotros
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Carreras
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Prensa
                    </Link>
                  </li>
                </ul>
              </div>
              {/* <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Términos
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Privacidad
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Cookies
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-muted-foreground hover:text-primary">
                      Licencias
                    </Link>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} YAPA. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    )
}