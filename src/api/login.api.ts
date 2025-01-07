const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface LoginResponse {
    access_token: string;
}

interface LoginError {
    message: string;
}

export interface Enable2fa {
    secret: string;
    otpauthUrl: string;
}

export async function is2faEnabled(email: string): Promise<Boolean | null> {
    try{
        const response = await fetch(`${API_URL}/auth/2fa/enabled`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorData: LoginError = await response.json();
            
            if(response.status === 401) {
                return null;
            }

            throw new Error(errorData.message || 'Failed to login');
        }

        const data: Boolean = await response.json();

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Error during login. Please try again later.');
    }
}

export async function generate2fa(values :{email: string; password: string}): Promise<Enable2fa | null> {
    try{
        const response = await fetch(`${API_URL}/auth/2fa/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            const errorData: LoginError = await response.json();
            
            if(response.status === 401) {
                return null;
            }

            throw new Error(errorData.message || 'Failed to login');
        }

        const data: Enable2fa = await response.json();

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Error during login. Please try again later.');
    }
}

export async function enable2fa(values: { twoFactorAuthenticationCode: string; email: string }): Promise<any | null> {
    try {
        const response = await fetch(`${API_URL}/auth/2fa/turn-on`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            const errorData: { message: string } = await response.json();
            
            if (response.status === 401) {
                return null;  
            }

            throw new Error(errorData.message || 'Failed to enable 2FA');
        }

        const data = await response.json();
        return data; 

    } catch (error) {
        console.error('Error enabling 2FA:', error);
        throw new Error('Error during enabling 2FA. Please try again later.');
    }
}


export async function loginUser(values: { email: string; password: string, code: string }): Promise<LoginResponse | null> {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            const errorData: LoginError = await response.json();
            
            if(response.status === 401) {
                return null;
            }

            throw new Error(errorData.message || 'Failed to login');
        }

        const data: LoginResponse = await response.json();

        if (!data.access_token || typeof data.access_token !== 'string') {
            throw new Error('Invalid token received');
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Error during login. Please try again later.');
    }
}