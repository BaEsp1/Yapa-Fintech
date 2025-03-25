import { TestData } from "@/components/modal/Onbording/steps/index";
import axios from "axios";
import Cookies from "js-cookie";
import assignProfileFinance, { assignKnowLedge } from "@/lib/testOnbording";
import { FinancialProfile, useFinancialProfileStore } from "@/store/user/userFinanceProfile";

const URL = process.env.NEXT_PUBLIC_API_URL 

async function sendProfileFinance(test: TestData): Promise<FinancialProfile | null> {
  const userLogged = JSON.parse(Cookies.get("userLogged") || "{}");
  const token = userLogged.token

  const riskProfile = assignProfileFinance(test);
  const knowledgeLevel = assignKnowLedge(riskProfile)
  const income = test.income
  const expenses = test.expenses
  const savings = test.savings

  const updateStore = useFinancialProfileStore.getState().setFinancialProfile;

  try {

    const response = await axios.put(`${URL}/api/profile/profile`, {
      riskProfile,
      knowledgeLevel,
      incomeMonthly:Number(income) ,
      expensesMonthly:Number(expenses),
      percentageSave: Number(savings),
      totalDebt: 0
    },{ 
      headers: {
      Authorization: `Bearer ${token}`,
    }});

    console.log("Respuesta del servidor:", response);
    
    const profileData: FinancialProfile = response.data.profile;
    updateStore(profileData);

    return profileData;

  } catch (error) {
    console.error("Error:", error);
    return null
      }

}

async function skipProfileFinance(): Promise<void> {
  const userLogged = JSON.parse(Cookies.get("userLogged") || "{}");
  const token = userLogged.token;

  const income = 0
  const expenses = 0
  const savings = 0
  
  try {
    const riskProfile = "SKIP";

    const response = await axios.put(`${URL}/api/profile/profile`, {
      riskProfile,
      incomeMonthly:income,
      expensesMonthly:expenses,
      percentageSave: savings,
      totalDebt: 0
    },{ 
      headers: {
      Authorization: `Bearer ${token}`,
    }});

    const profileData = response.data;

    useFinancialProfileStore.setState({ financialProfile: profileData });

    return profileData;
  } catch (error) {

    
      console.error("Hubo un error al enviar el perfil al backend:", error);
    }
  
}

 export type ProfileData = {
  incomeMonthly: number;
  expensesMonthly: number;
  percentageSave: number;
  totalDebt: number;
};

async function updateProfileData<K extends keyof ProfileData>(key: K, value: ProfileData[K]): Promise<void> {
  const userLogged = JSON.parse(Cookies.get("userLogged") || "{}");
  const token = userLogged.token;

  const updateStore = useFinancialProfileStore.getState().setFinancialProfile;

  try {
    const updateData = { [key]: value } as { [key in K]: ProfileData[K] };

    const response = await axios.put(`${URL}/api/profile/profile`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const profileData = response.data;
    updateStore(profileData);

    return profileData;
  } catch (error) {
    console.error("Error:", error);
  }
}


export {
    sendProfileFinance,
    skipProfileFinance,
    updateProfileData
}