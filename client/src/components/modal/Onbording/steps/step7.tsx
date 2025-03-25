import Button from "@/components/ui/Button";
import { useFinancialProfileStore } from "@/store/user/userFinanceProfile";
import Image from "next/image";
import { Sembrador, Cazador, Explorador, WarningBlue } from "@/assets";
import { redirect } from 'next/navigation';
import { useModalStore } from "@/store/onBording/modal";

export default function Step7() {
  const { financialProfile } = useFinancialProfileStore();
  const { closeModal } = useModalStore()
  let message = "";
  let img

  const handleHome = () =>{
    redirect("/app/home")
  }

  const handleStay = () =>{
    closeModal()
  }

  if (financialProfile?.riskProfile === "Sembrador de oportunidades") {
    message =
      "Sueles priorizar la preservación del capital y tratar de minimizar el riesgo. Estos inversores prefieren inversiones estables y de baja volatilidad, como bonos o acciones de primera línea.";
    img = Sembrador;
  } else if (financialProfile?.riskProfile === "Explorador de nuevos caminos") {
    message =
      "Prefieres activos que ofrezcan estabilidad pero también cierto riesgo, como bonos de calidad y acciones de empresas consolidadas, buscando un crecimiento sostenido con una volatilidad controlada.";
    img = Explorador;
  } else if (financialProfile?.riskProfile === "Cazador de inversiones") {
    message =
      "Prefieres acciones emergentes, startups innovadoras y otros activos que puedan ofrecer un crecimiento significativo, a menudo a costa de una mayor incertidumbre.";
    img = Cazador;
  } else {
    return (
      <div className="flex flex-col justify-center text-center items-center h-[20em] w-[94%] m-auto">
        <Image
          src={WarningBlue}
          alt=""
          className="h-20 w-20 mb-5"
        ></Image>
        <h1 className="text-h5-medium text-white900 p-1">¡Upss.. algo salió mal!</h1>
        <p className="text-p2-regular text-white700 p-2">
          Intenta realizar el Test nuevamente
        </p>
        <br></br>
        <div  className="flex flex-col w-[95%]  m-auto lg:w-[25em]">
            <Button variant="solid" size="small" onClick={handleHome}>
              Reiniciar
            </Button>

        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col items-center justify-center text-center w-[94%] m-auto lg:w-[25em]">
      <h1 className="text-p2-regular text-white900">Parece que eres un: </h1>
      <h1 className="text-h4-bold text-white900 pb-6 w-[80%]">
        {financialProfile?.riskProfile}
      </h1>
      <Image src={img} alt="" className="w-[80%] "></Image>
      <p className="text-p2-regular text-white900 w-[90%] py-4">{message}</p>

      <div className="flex flex-col gap-3 w-[90%]  m-auto lg:w-[25em]">

          <Button variant="solid" size="small" onClick={handleStay} className="rounded-full">
            Empecemos la aventura
          </Button>

          <a href="/app/profile">
          <Button variant="basic" size="small" className="rounded-full w-full">
            Desglose de resultados
          </Button>
          </a>

      </div>
    </div>
  );
}
