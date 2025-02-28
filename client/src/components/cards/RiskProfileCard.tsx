"use client";
import { useFinancialProfileStore } from "@/store/user/userFinanceProfile"
import Button from "../ui/Button"
import Image from "next/image"
import { useModalStore } from "@/store/onBording/modal";
import { CazadorUser, ExploradorUser, SembradorUser, SkipUser} from "@/assets";
import Onbording from "../modal/Onbording/onbording";

export const RiskProfileUser = () =>{

    const { modalState, openModal} = useModalStore(); 

    const { financialProfile } = useFinancialProfileStore();
    let msg
    let img
    let goals
    let time
    let level

    if (financialProfile?.riskProfile === "Sembrador de oportunidades"){ img = SembradorUser ; msg = "Priorizas la seguridad de tu capital y prefieres inversiones de bajo riesgo."; goals = "Crecimiento de corto plazo"; time="Máximo 2 años"; level = "Conservador" }
    if (financialProfile?.riskProfile === "Explorador de nuevos caminos"){ img = ExploradorUser ; msg = "Buscas inversiones de riesgo moderado y buen retorno." ; goals ="Crecimiento de mediano plazo";time ="2 - 5 años"; level = "Moderado" }
    if (financialProfile?.riskProfile === "Cazador de inversiones"){ img = CazadorUser ; msg = "Buscas inversiones de riesgo moderado y buen retorno." ; goals = "Crecimiento de largo plazo"; time="Mínimo 5 años"; level="Arriesgado" }
    if (financialProfile?.riskProfile === "SKIP") {img=SkipUser ; msg="Aún no haz realizado el Test del Inversor."; goals = "Sin identificar" ; time="Sin identificar"}

    return (
    <div className="border border-white200 rounded-lg ">
        {modalState === "Abierto" && <Onbording />}
        <div className="flex flex-row gap-5 ">
            <div className="flex flex-col w-[50%] gap-1 p-3">
                <h1 className="text-h6-bold text-white900 ">{financialProfile?.riskProfile === "SKIP" ? "Test Omitido" : financialProfile?.riskProfile}</h1>
                <p className="text-p2-regular">{msg}</p>
            </div>
            <Image src={img} alt="" className="h-[9em] w-[9em] mx-auto mr-1"/>
        </div>
        <div className="flex flex-col p-3 gap-2">
            <div className="flex flex-row justify-between">
                <h2 className="text-p1-bold text-white600 flex items-center">Perfil de Riesgo</h2>
                <p className="text-p2-regular text-white900 w-[50%] text-end">
                {financialProfile?.riskProfile === "SKIP" ? "Sin identificar" : financialProfile?.riskProfile +" / "}
                {financialProfile?.riskProfile !== "SKIP" && (
                    <span className="text-p2-regular text-accent400">{level}</span>
                )}
                </p>            
            </div>
            <div className="flex flex-row justify-between">
                <h2 className="text-p1-bold text-white600">Metas de inversion</h2>
                <p className="text-p2-regular text-white900 w-[50%] text-end">{goals}</p>
            </div>
            <div className="flex flex-row justify-between">
                <h2 className="text-p1-bold text-white600">Plazo de inversión</h2>
                <p className="text-p2-regular text-white900 w-[50%] text-end">{time}</p>
            </div>
        </div>

        {financialProfile?.riskProfile !=="SKIP"
        ?
        <div className="p-2 flex flex-col gap-3">
            <Button variant="solid" size="small" className="rounded-full">Ver más detalles</Button>
            <Button variant="basic" size="small" className="rounded-full" onClick={openModal}>Test del Inversor</Button>
        </div>
            :
        <div className="p-2 flex flex-col mb-2" >
            <Button variant="solid" size="small" className="flex rounded-full" onClick={openModal}>Test del Inversor</Button>
            </div> }
    </div>)
}