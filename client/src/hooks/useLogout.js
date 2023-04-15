import useAuth from "./useAuth";
import { logoutAllTabs } from "./../shared/auth/auth";
import axios from './../service/axios';

const useLogout = () => {
    const { setAuth } = useAuth();

    const logoutUser = async () => {
        setAuth({});
        try {
            await axios.get('/auth/logout', {
                withCredentials: true,
            });
            logoutAllTabs();
        } catch (err) {
            console.error(err);
        }
    }

    return logoutUser;
}

export default useLogout