
export const FAQHome = () =>{

    return (
    <div className="justify-center px-2">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Preguntas frecuentes</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Resolvemos tus dudas sobre YAPA y cómo puede ayudarte a alcanzar tus metas financieras.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-background p-6 rounded-lg shadow-sm border border-white200">
            <h3 className="text-xl font-semibold mb-2 text-accent400">¿Necesito experiencia previa en inversiones?</h3>
            <p className="text-muted-foreground">
              No, YAPA está diseñada para usuarios de todos los niveles. Si eres principiante, te guiaremos paso a
              paso en el mundo de las inversiones.
            </p>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-sm border border-white200">
            <h3 className="text-xl font-semibold mb-2 text-accent400">¿Cuánto dinero necesito para empezar?</h3>
            <p className="text-muted-foreground">
              Puedes comenzar con el monto que te sientas cómodo. YAPA se adapta a tus posibilidades y te ayuda a
              crecer desde donde estés.
            </p>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-sm border border-white200">
            <h3 className="text-xl font-semibold mb-2 text-accent400">¿Es seguro invertir con YAPA?</h3>
            <p className="text-muted-foreground">
              Sí, YAPA cumple con todas las regulaciones financieras de Argentina y utiliza tecnología de
              encriptación avanzada para proteger tus datos y transacciones.
            </p>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-sm border border-white200">
            <h3 className="text-xl font-semibold mb-2 text-accent400">¿Puedo retirar mi dinero cuando quiera?</h3>
            <p className="text-muted-foreground">
              Dependiendo del tipo de inversión, algunos fondos pueden tener plazos mínimos. YAPA te muestra
              claramente la liquidez de cada inversión antes de que decidas.
            </p>
          </div>
        </div>
      </div>
      )
}