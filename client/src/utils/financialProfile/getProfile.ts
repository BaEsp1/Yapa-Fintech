import { useFinancialProfileStore } from "@/store/user/userFinanceProfile";
import axios from 'axios';
import Cookies from "js-cookie";
import { FinancialProfile } from "@/store/user/userFinanceProfile";

const URL = process.env.NEXT_PUBLIC_API_URL 

interface GetUserProfileResponse {
  profileData: FinancialProfile | null;
}

export const getUserProfile = async (): Promise<GetUserProfileResponse> => {
  const userLogged = JSON.parse(Cookies.get('userLogged') || '{}');
  const token = userLogged.token

  try {
    const profileResponse = await axios.get(`${URL}/api/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
  }})
    const profileData = profileResponse.data;

    const { setFinancialProfile } = useFinancialProfileStore.getState();
    setFinancialProfile(profileData);

    return { profileData };

    } catch {
    return { profileData: null };
}
}

export default getUserProfile;
