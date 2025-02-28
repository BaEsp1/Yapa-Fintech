"use client";
import { useEffect , useState} from "react";
import Image from "next/image";
import { ArrowLargeLeft } from "@/assets";
import SettingsIcon from '@mui/icons-material/Settings';
import { ProfileUser } from "@/components/cards/ProfileCard";
import { RiskProfileUser } from "@/components/cards/RiskProfileCard";
import getUserProfile from "@/utils/financialProfile/getProfile";
import { ProgressUser } from "@/components/cards/ProgressUserCard";

export default function Profile() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {

        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            getUserProfile();
        }
    }, [isClient]);
    return (
        <main className="w-full h-full bg-white">

        <section className="flex flex-row justify-between items-center p-6 w-full">
            <div className="flex flex-row gap-4">
                <button><Image src={ArrowLargeLeft} alt=""/></button>
                <h1 className="text-h6-bold text-white900">Perfil</h1>
            </div>

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

        </main>
    )
}