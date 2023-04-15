import axios from './../service/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return {
                ...prev,
                userCreds: response.data.output.foundUser,
                roles: response.data.output.roles,
                accessToken: response.data.output.accessToken
            }
        });
        return response.data.output.accessToken;
    }
    return refresh;
};

export default useRefreshToken;