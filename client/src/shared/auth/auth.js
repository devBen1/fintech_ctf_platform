import { BroadcastChannel } from 'broadcast-channel';
// import { persistor } from "../redux/store";

const logoutChannel = new BroadcastChannel('logout');

export const login = (usertoken, refreshToken) => {
    localStorage.setItem("token", usertoken);
}

export const logout = () => {
    logoutChannel.postMessage("Logout")
    // persistor.purge();
    // localStorage.clear();
    localStorage.removeItem("token")
    localStorage.removeItem("persist")
    window.location.href = window.location.origin + "/";

}

export const logoutAllTabs = () => {
    logoutChannel.onmessage = () => {
        logout();
        logoutChannel.close();
    }
}