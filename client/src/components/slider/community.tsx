import {  educationActive, educationDefault, newsActive, newsDefault , foroActive, foroDefault} from "@/assets"
import Image from "next/image"
import { useState } from "react"
import { CarouselComunnity } from "../carousel/communityUser"
import { Search } from "@mui/icons-material"
import { NewsSection } from "../cards/NewsCard"
import { ForoSection } from "../cards/ForoCard"

export const SliderCommunity = () =>{
    
    const [visualData , setVisualData] = useState("Education")

    const handleChangeEducation = () =>{
        setVisualData("Education")
    }

    const handleChangeNews = () =>{
        setVisualData("News")
    }

    const handleChangeForo = () =>{
        setVisualData("Foro")
    }

    return (
    <div className="w-full flex flex-col gap-4 mx-auto h-full">

        <div className="flex flex-row justify-around gap-1 p-2">
            <button onClick={handleChangeEducation}>
                { visualData === "Education" 
                ? <Image src={educationActive} alt=""/>
                : <Image src={educationDefault} alt=""/>
                }
            </button>

            <button onClick={handleChangeNews}>
                { visualData === "News"
                ? <Image src={newsActive} alt=""/>
                : <Image src={newsDefault} alt=""/>
                }
            </button>

            <button onClick={handleChangeForo}>
                { visualData === "Foro"
                ? <Image src={foroActive} alt=""/>
                : <Image src={foroDefault} alt=""/>
                }
            </button>
        </div>


        { visualData === "Education" &&
        <>        
            <div className="flex flex-row gap-2 border w-[23.5em] p-1 border-white300 rounded items-center mx-auto">
                <Search className=" ml-2 opacity-50"/>
                <input
                type="text"
                placeholder="Buscar por temas "
                className=" text-p2-regular text-white600">
                </input>
            </div>
            <CarouselComunnity />
        </>
        }
        
        { visualData ==="News" &&
        <NewsSection/>
        }
        
        { visualData ==="Foro" &&
        <ForoSection />
        }


    </div>)
}