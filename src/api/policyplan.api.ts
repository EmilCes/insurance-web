const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ValidatePlatesResponse {
    plates: string;
}

export async function validatePlates(values: { plates: string }): Promise<ValidatePlatesResponse | null> {
    try {
        /*
        const response = await fetch(`${API_URL}/policyplan/${values.plates}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            throw new Error('Plates alredy register');
        }
        
        if (response.status === 401){
            return values;
        }*/

        throw new Error('Error during validating plates');
        
    } catch (error) {
        console.error('Validate plates error:', error);
        throw new Error('Error during validating plates. Please try again later.');
    }
}