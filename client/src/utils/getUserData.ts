import { useUserStore } from "@/store/user/userStore";
import Cookies from "js-cookie";
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL 

export const getUserData = async () => {
  const userLogged = JSON.parse(Cookies.get('userLogged') || '{}');
  const userId = userLogged.userId;
  const token = userLogged.token

  try {
    const userResponse = await axios.get(`${URL}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = userResponse.data;

    const { setUser } = useUserStore.getState();
    setUser({
      id: userId,
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      photoUrl: userData.photoUrl,
      phoneNumber: userData.phoneNumber,
      birthDate: userData.birthDate,
      registerDate: userData.registerDate,
      roles: userData.roles,
    });

    return { userData };

  } catch (error) {
    console.error('Error en la solicitud al backend:', error);
  }
};

export default getUserData;
