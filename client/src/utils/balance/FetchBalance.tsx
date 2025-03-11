import axios from 'axios';
import Cookies from 'js-cookie';
const URL = process.env.NEXT_PUBLIC_API_URL 

interface WalletData {
  deposited: number;
  invested: number;
  saved: number;
  totalBalance: number;
}

//funcion para obtener el balance
export const fetchWalletData = async (): Promise<WalletData> => {
    const userLogged = JSON.parse(Cookies.get('userLogged') || '{}');
  const token = userLogged.token

  try {
    const response = await axios.get(`${URL}/api/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
    }} );

    return response.data;

  } catch (error) {
    console.error('Error fetching wallet data:', error);
    throw error;
  }
};


// Función para actualizar el deposited
export const updateDepositedAmount = async () => {
    const userLogged = JSON.parse(Cookies.get('userLogged') || '{}');
  const token = userLogged.token

  try {
    const response = await axios.put(`${URL}/api/balance/deposited`, { amount: 100000 } , {
        headers: {
          Authorization: `Bearer ${token}`,
    }});
        return response.data

  } catch (error) {
    console.error('Error al actualizar el monto', error);
    }
}