const URL = process.env.NEXT_PUBLIC_API_URL 

export  interface LoginUser {   
    email: string;
    password: string; 
}


export const fetchLoginUser = async (userData: LoginUser) => {

    try {
        const response = await fetch(`${URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        throw error;
    }
};