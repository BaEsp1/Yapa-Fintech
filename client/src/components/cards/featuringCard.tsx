import { AccountBalanceOutlined, AttachMoneyOutlined, BarChart, Insights, MyLocation, SavingsOutlined } from "@mui/icons-material";

export const FeatureHome = () =>{

    return (
    <div className="justify-center">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold">Características principales</h2>
                  <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    YAPA te ofrece todas las herramientas que necesitas para gestionar y hacer crecer tu patrimonio.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-2">
                  <div className="bg-background p-6 rounded-xl shadow-lg border border-white200">
                    < MyLocation className="h-10 w-10 text-primary400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Objetivos personalizados</h3>
                    <p className="text-muted-foreground">
                      Define tus metas financieras, ya sea para unas vacaciones, un auto nuevo o tu futuro hogar.
                    </p>
                  </div>
                  <div className="bg-background p-6 rounded-xl shadow-lg border border-white200">
                    <BarChart className="h-10 w-10 text-primary500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Portafolio inteligente</h3>
                    <p className="text-muted-foreground">
                      Recibe un portafolio de inversiones adaptado a tu perfil y a las condiciones del mercado.
                    </p>
                  </div>
                  <div className="bg-background p-6 rounded-xl shadow-lg border border-white200">
                    <Insights className="h-10 w-10 text-primary600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Aprendizaje continuo</h3>
                    <p className="text-muted-foreground">
                      La app aprende de tus decisiones para ofrecerte recomendaciones cada vez más precisas.
                    </p>
                  </div>
                  <div className="bg-background p-6 rounded-xl shadow-lg border border-white200">
                    <AccountBalanceOutlined className="h-10 w-10 text-primary700 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Gestión simplificada</h3>
                    <p className="text-muted-foreground">
                      Administra todas tus inversiones desde un solo lugar, con una interfaz intuitiva y fácil de usar.
                    </p>
                  </div>
                  <div className="bg-background p-6 rounded-xl shadow-lg border border-white200">
                    <AttachMoneyOutlined className="h-10 w-10 text-primary800 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Educación financiera</h3>
                    <p className="text-muted-foreground">
                      Aprende sobre finanzas e inversiones con contenido educativo adaptado a tu nivel de experiencia.
                    </p>
                  </div>
                  <div className="bg-background p-6 rounded-xl shadow-lg border border-white200">
                    <SavingsOutlined className="h-10 w-10 text-primary900 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Ahorro inteligente</h3>
                    <p className="text-muted-foreground">
                      Establece estrategias de ahorro automático que se ajusten a tus ingresos y gastos.
                    </p>
                  </div>
                </div>
              </div>)
}