const URL = process.env.NEXT_PUBLIC_API_URL 
export interface RegisterUser {
    name: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: number;  
    birthDate: Date;
    country: string;
  }
  
  export const fetchRegisterUser = async (userData: RegisterUser) => {
    const dataForRegisterUser = {
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      phoneNumber: String(userData.phoneNumber),
      birthDate: userData.birthDate,
      country: userData.country,
      photoUrl: "string",
    };
  
    // console.log(dataForRegisterUser);
  
    try {
      const response = await fetch(`${URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForRegisterUser),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      // console.log(data)
      
      return data;
    } catch (error) {
      console.error("Error durante el registro", error);
      throw error;
    }
  };
  