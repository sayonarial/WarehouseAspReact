import axios from 'axios';

const BASE_URL = 'https://localhost:7224/api/Auth';

export default class AuthService {

    static async validateUser(username, password) {

        const response = await axios.post(
            (BASE_URL + '/login'),
            JSON.stringify({ username, password }),
            {
                headers: { 
                    'Content-type': 'application/json',
                    
                },
                withCredentials: true
            }

        );
        return response.data

    }

    static async registerUser(username, password) {

        const response = await axios.post(
            (BASE_URL + '/register'),
            JSON.stringify({ username, password }),
            {
                headers: { 'Content-type': 'application/json' },
                withCredentials: true
            }

        );
        return response.data

    }

}


