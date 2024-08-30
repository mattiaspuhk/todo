import {createContext, useCallback, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    checkForToken: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate()
    const location = useLocation()

    const checkForToken = useCallback(() => {
        const jwtToken = localStorage.getItem('jwt-token')
        if (jwtToken) {
            navigate('/todos')
            setToken(jwtToken)
        } else if (location.pathname !== '/register') {
            navigate('/login')
        }
    }, [location.pathname, navigate])

    const logout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('jwt-token')
        checkForToken()
    }

    const setLoginItems = (username, jwt) => {
        localStorage.setItem('jwt-token', jwt)
        localStorage.setItem('username', username)
    }

    const value = { token, setToken, checkForToken, logout, setLoginItems };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider