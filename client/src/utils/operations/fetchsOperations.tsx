import { Instrument } from "@/store/operations/operations";
import axios from "axios";
import Cookies from "js-cookie";
const URL = process.env.NEXT_PUBLIC_API_URL

//No funciona get y post no guarda isntrument
export const fetchOperations = async() =>{
    const userLogged = JSON.parse(Cookies.get('userLogged') || '{}');
    const token = userLogged.token

     try {
      const response = await axios.get(`${URL}/api/operations`,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data; 
        return data
    } catch (error) {
      console.error('Error al cargar operaciones:', error);
    }
}
  
  interface OperationRequest {
    instrument: Instrument
    operationType: string;
    currency: string;
    subTotal: number;
    totalPrice: number;
  }
  
  export const fetchCreateOperation = async (operationData: OperationRequest) => {
    const userLogged = JSON.parse(Cookies.get('userLogged') || '{}');
    const token = userLogged.token

    try {
      const response = await axios.post(`${URL}/api/operations/operations`, operationData ,{
        headers: {
        Authorization: `Bearer ${token}`
      }
    })
  
      if (!response) {
        throw new Error('Error al realizar la operación');
      }

      const data = response.data
      return data;  

    } catch (error) {
      console.error(error);
      return null; 
    }
  };
  