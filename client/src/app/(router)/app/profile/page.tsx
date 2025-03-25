"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLargeLeft } from "@/assets";
import { ProfileUser } from "@/components/cards/ProfileCard";
// import { RiskProfileUser } from "@/components/cards/RiskProfileCard";
import getUserProfile from "@/utils/financialProfile/getProfile";
import { ProgressUser } from "@/components/cards/ProgressUserCard";
import dynamic from "next/dynamic";
import Link from "next/link";
import Loading from "@/components/animations/Loader/loader";
import getUserData from "@/utils/getUserData";

const SettingsIcon = dynamic(() => import("@mui/icons-material/Settings"), {
  ssr: false,
});

const RiskProfileUser = dynamic(() => import("@/components/cards/RiskProfileCard").then(mod => mod.RiskProfileUser), { ssr: false });


export default function Profile() {
    const [loading , setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([getUserProfile(), getUserData()]);
            } catch (error) {
                console.error("Error al cargar los datos del perfil:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, []);
    
    
    return (
        <main className="w-full h-full bg-white">
        {loading 
        ? (<Loading/>)
        :(<>
        <section className="flex flex-row justify-between items-center p-6 w-full">

                <Link href="/app/home" className="flex flex-row gap-4">
                <Image src={ArrowLargeLeft} alt=""/>
                <h1 className="text-h6-bold text-white900">Perfil</h1>
                </Link>


            <button className="flex flex-row">
                <SettingsIcon sx={{ fontSize: 13 }} className="mb-1" />
                <SettingsIcon sx={{ fontSize: 20 }} className="mt-1 ml-[-0.2em]"/>
            </button>

        </section>

        <section>
            <ProfileUser/>
        </section>

        <section className="p-3">
            <RiskProfileUser />
        </section>

        <section className="p-3">
            <ProgressUser/>
        </section>
        </>)}

        </main>
    )
}