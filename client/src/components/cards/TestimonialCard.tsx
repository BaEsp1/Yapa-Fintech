import Image from 'next/image';
import {Martin , Laura , Carlos , Lucia , Felipe , Lina} from "@/assets"

export const TestimonialsHome = () => {
  return (
    <div className="justify-center">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">Lo que dicen nuestros usuarios</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Miles de argentinos ya están construyendo su futuro financiero con YAPA.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-background p-6 rounded-lg shadow-lg border border-white200">
          <div className="flex items-center mb-4">
            <Image
              src={Martin}
              alt="Foto de Martín G."
              width={80} 
              height={80} 
              className="rounded-full mr-4"
            />
            <div>
              <h4 className="font-semibold">Martín G.</h4>
              <p className="text-sm text-muted-foreground">Buenos Aires</p>
            </div>
          </div>
          <p className="text-muted-foreground">
          &quot;Gracias a YAPA pude ahorrar para mis vacaciones en solo 6 meses. La app me ayudó a entender cómo
            invertir sin complicaciones. &quot;
          </p>
        </div>
        <div className="bg-background p-6 rounded-lg shadow-lg border border-white200">
          <div className="flex items-center mb-4">
            <Image
              src={Laura}
              alt="Foto de Laura M."
              width={80}
              height={80}
              className="rounded-full mr-4"
            />
            <div>
              <h4 className="font-semibold">Laura M.</h4>
              <p className="text-sm text-muted-foreground">Córdoba</p>
            </div>
          </div>
          <p className="text-muted-foreground">
          &quot;Nunca había invertido antes y tenía miedo de perder mi dinero. YAPA me dio la confianza para empezar
            y ahora estoy más cerca de comprar mi primer auto. &quot;
          </p>
        </div>
        <div className="bg-background p-6 rounded-lg shadow-lg border border-white200">
          <div className="flex items-center mb-4">
            <Image
              src={Carlos}
              alt="Foto de Carlos R."
              width={80}
              height={80}
              className="rounded-full mr-4"
            />
            <div>
              <h4 className="font-semibold">Carlos R.</h4>
              <p className="text-sm text-muted-foreground">Mendoza</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            &quot; Lo que más me gusta de YAPA es que aprende de mis decisiones. Cada vez las recomendaciones son más
            acertadas y he visto crecer mi patrimonio constantemente. &quot;
          </p>
        </div>
        <div className="bg-background p-6 rounded-lg shadow-lg border border-white200">
          <div className="flex items-center mb-4">
            <Image
              src={Lucia}
              alt="Foto de Lucia T."
              width={80}
              height={80}
              className="rounded-full mr-4"
            />
            <div>
              <h4 className="font-semibold">Lucía T.</h4>
              <p className="text-sm text-muted-foreground">Tucumán</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            &quot;Lo que más valoro de YAPA es la atención personalizada. Siempre me siento acompañada y segura en
            cada paso que doy con mi dinero. ¡Es un cambio total en mi forma de ahorrar e invertir!&quot;
          </p>
        </div>
        <div className="bg-background p-6 rounded-lg shadow-lg border border-white200">
          <div className="flex items-center mb-4">
            <Image
              src={Felipe}
              alt="Foto de Felipe L."
              width={80}
              height={80}
              className="rounded-full mr-4"
            />
            <div>
              <h4 className="font-semibold">Felipe L.</h4>
              <p className="text-sm text-muted-foreground">Neuquén</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            &quot;Antes de usar YAPA, nunca había pensado en invertir. Gracias a su interfaz fácil de usar, ahora tengo
            un portafolio bien diversificado y un futuro financiero mucho más seguro.&quot;
          </p>
        </div>
        <div className="bg-background p-6 rounded-lg shadow-lg border border-white200">
          <div className="flex items-center mb-4">
            <Image
              src={Lina}
              alt="Foto de Lina P."
              width={80}
              height={80}
              className="rounded-full mr-4"
            />
            <div>
              <h4 className="font-semibold">Lina P.</h4>
              <p className="text-sm text-muted-foreground">Rosario</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            &quot;Me ha sorprendido lo fácil que es usar YAPA. He aprendido mucho sobre el mercado y ahora mi dinero
            trabaja por mí. ¡Recomiendo la app al 100%!&quot;
          </p>
        </div>
      </div>
    </div>
  );
};
