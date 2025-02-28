"use client";
import { CarrouselRecommends } from "../carousel/recommendationsUser"
import { GrowthProgressBar } from "../progressBar/growthBar"

export const ProgressUser = () =>{

 return (
 <div className="p-2 flex flex-col gap-4">
    <h1 className="text-h5-semibold text-white900">Progreso y metas</h1>
    <GrowthProgressBar totalSteps={10} currentStep={7.5}/>
    <div className="bg-primary50 rounded-lg h-[23em] p-2 pt-3">

        <div className= "flex flex-row justify-between p-3">
            <h1 className="text-white900 text-h6-bold">Recomendaciones</h1>
            <h1 className="text-white900 text-h6-semibold">Ver todo</h1>
        </div>
        <div className="h-[23em]">
            <CarrouselRecommends/>
        </div>
    </div>
 </div>)
}