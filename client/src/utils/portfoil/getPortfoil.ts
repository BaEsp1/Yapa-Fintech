import axios from 'axios';
import Cookies from "js-cookie";
const URL = process.env.NEXT_PUBLIC_API_URL 

export const getPortfolios = async () => {

    const userLogged = JSON.parse(Cookies.get('userLogged') || '{}');
    const userId = userLogged.userId;
    const token = userLogged.token

  try {
    const response = await axios.get(`${URL}/api/portfoil/${userId}`,
    {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    return response.data; 
    
  } catch (error) {
    throw new Error('Error al obtener los portafolios: ' + error);
  }
};
